import { z } from "zod";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { emailSchema, enforceRateLimit } from "@/lib/security";
import { sendEmail } from "@/lib/email";
export async function POST(req:Request){try{
 const ip=req.headers.get("x-forwarded-for")?.split(",")[0]||"unknown"; await enforceRateLimit(`register:${ip}`,4,3600);
 const body=z.object({name:z.string().trim().min(2).max(80),email:emailSchema,password:z.string().min(12).max(128).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/)}).parse(await req.json());
 if(await db.user.findUnique({where:{email:body.email}}))return NextResponse.json({error:"An account with that email already exists."},{status:409});
 const user=await db.user.create({data:{name:body.name,email:body.email,passwordHash:await bcrypt.hash(body.password,12)}});
 const token=crypto.randomUUID()+crypto.randomUUID(); await db.emailToken.create({data:{userId:user.id,token,purpose:"VERIFY",expiresAt:new Date(Date.now()+86400000)}});
 const origin=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";
 await sendEmail(body.email,"Verify your Northline email",`<p>Welcome to Northline. <a href="${origin}/api/verify?token=${token}">Verify your email</a>. This link expires in 24 hours.</p>`);
 return NextResponse.json({ok:true,message:"Account created. Check your email to verify your address."},{status:201});
 }catch(e){return NextResponse.json({error:e instanceof Error&&e.message==="RATE_LIMITED"?"Too many attempts. Try again later.":"Unable to create account. Check your details and try again."},{status:400});}}
