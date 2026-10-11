import { demoProducts } from "@/lib/catalog";
import { db } from "@/lib/db";

export async function getProducts(){if(!process.env.DATABASE_URL)return demoProducts;try{const rows=await db.product.findMany({where:{active:true},orderBy:{createdAt:"desc"}});return rows.length?rows:demoProducts;}catch{return demoProducts;}}
export async function getProduct(slug:string){return (await getProducts()).find(p=>p.slug===slug);}





