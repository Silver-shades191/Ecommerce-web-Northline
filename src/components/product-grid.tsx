import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getProducts } from "@/lib/products";
import { money } from "@/lib/format";
export async function ProductGrid({category,query,sort,initialProducts}:{category?:string;query?:string;sort?:string;initialProducts?:Awaited<ReturnType<typeof getProducts>>}){let products=initialProducts??await getProducts();if(category)products=products.filter(p=>p.category.toLowerCase()===category.toLowerCase());if(query)products=products.filter(p=>(p.name+p.description+p.category).toLowerCase().includes(query.toLowerCase()));if(sort==="price-asc")products.sort((a,b)=>a.price-b.price);if(sort==="price-desc")products.sort((a,b)=>b.price-a.price);if(sort==="newest")products.sort((a,b)=>new Date(String(("createdAt" in b?b.createdAt:"")??"")).getTime()-new Date(String(("createdAt" in a?a.createdAt:"")??"")).getTime());return <div className="product-grid">{products.map(p=><Link key={p.slug} href={`/product/${p.slug}`} className="product-card"><div className="product-image"><Image src={p.image} alt={p.name} fill sizes="(max-width: 680px) 50vw, (max-width: 1000px) 33vw, 25vw"/><span className="product-tag">{p.featured?"FIELD FAVORITE":p.category.toUpperCase()}</span><span className="product-quick">View details <ArrowUpRight size={14}/></span></div><div className="product-meta"><div><h3>{p.name}</h3><span>{p.category}</span></div><div className="price">{money(p.price)}</div></div></Link>)}</div>}






