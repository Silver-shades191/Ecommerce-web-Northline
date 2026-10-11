import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
const schema=z.object({slug:z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),name:z.string().min(2).max(120),description:z.string().min(10).max(3000),category:z.string().min(2).max(80),price:z.number().int().min(1),inventory:z.number().int().min(0),image:z.string().url(),sizes:z.array(z.string()).max(30),colors:z.array(z.string()).max(30)});
async function admin(){const s=await auth();return s?.user?.role==="ADMIN";}
export async function POST(req:Request){if(!await admin())return NextResponse.json({error:"Forbidden"},{status:403});try{const p=schema.parse(await req.json());const product=await db.product.create({data:{...p,images:[p.image],featured:false}});return NextResponse.json(product,{status:201});}catch{return NextResponse.json({error:"Product data is invalid or the slug is already in use."},{status:400});}}
