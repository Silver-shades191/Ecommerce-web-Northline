import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import { db } from "@/lib/db";
import ProductDetail from "@/components/product-detail";
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=await getProduct(slug);if(!p)notFound();let reviews:{id:string;rating:number;title:string;body:string;createdAt:Date;user:{name:string|null}}[]=[];try{reviews=await db.review.findMany({where:{productId:p.id},include:{user:{select:{name:true}}},orderBy:{createdAt:"desc"}})}catch{}return <ProductDetail product={p} reviews={reviews}/>}
