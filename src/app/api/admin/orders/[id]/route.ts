import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){const s=await auth();if(s?.user?.role!=="ADMIN")return NextResponse.json({error:"Forbidden"},{status:403});try{const {status}=z.object({status:z.enum(["PROCESSING","SHIPPED","DELIVERED","CANCELLED","REFUNDED"])}).parse(await req.json());const {id}=await params;return NextResponse.json(await db.order.update({where:{id},data:{status}}));}catch{return NextResponse.json({error:"Unable to update order."},{status:400});}}
