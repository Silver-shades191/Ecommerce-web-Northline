import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function GET(req:Request){const token=new URL(req.url).searchParams.get("token");if(!token)return NextResponse.redirect(new URL("/login?verified=invalid",req.url));
 const record=await db.emailToken.findUnique({where:{token},include:{user:true}});
 if(!record||record.purpose!=="VERIFY"||record.expiresAt<new Date())return NextResponse.redirect(new URL("/login?verified=expired",req.url));
 await db.$transaction([db.user.update({where:{id:record.userId},data:{emailVerified:new Date()}}),db.emailToken.delete({where:{token}})]);
 return NextResponse.redirect(new URL("/login?verified=success",req.url));}
