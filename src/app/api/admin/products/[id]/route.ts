import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
async function admin(){const s=await auth();return s?.user?.role==="ADMIN";}
const schema=z.object({name:z.string().min(2).max(120).optional(),description:z.string().min(10).max(3000).optional(),category:z.string().min(2).max(80).optional(),price:z.number().int().min(1).optional(),inventory:z.number().int().min(0).optional(),active:z.boolean().optional()});
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){if(!await admin())return NextResponse.json({error:"Forbidden"},{status:403});try{const {id}=await params;const body=schema.parse(await req.json());return NextResponse.json(await db.product.update({where:{id},data:body}));}catch{return NextResponse.json({error:"Unable to update product."},{status:400});}}
export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){if(!await admin())return NextResponse.json({error:"Forbidden"},{status:403});const {id}=await params;await db.product.update({where:{id},data:{active:false}});return NextResponse.json({ok:true});}
