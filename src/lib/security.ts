import { z } from "zod";
import { db } from "@/lib/db";
export async function enforceRateLimit(key:string, limit=8, windowSeconds=900){
 const now=new Date(), resetAt=new Date(Date.now()+windowSeconds*1000);
 const current=await db.rateLimit.upsert({where:{key},create:{key,count:1,resetAt},update:{count:{increment:1}}});
 if(current.resetAt<now){await db.rateLimit.update({where:{key},data:{count:1,resetAt}});return;}
 if(current.count>limit)throw new Error("RATE_LIMITED");
}
export const emailSchema=z.string().trim().email().max(254).transform(v=>v.toLowerCase());
export function safeError(error:unknown){return error instanceof Error&&error.message==="RATE_LIMITED"?"Too many attempts. Please wait and try again.":"Something went wrong. Please try again.";}
