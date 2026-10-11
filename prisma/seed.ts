import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
const products = [
 {slug:"ridge-shell",name:"Ridge Shell Jacket",description:"A weatherproof, quietly capable shell built for changing conditions. Recycled 3-layer fabric, sealed seams, and a clean silhouette that works beyond the trail.",category:"Outerwear",price:24800,compareAt:29500,image:"https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1200&q=85",colors:["Pine","Stone"],sizes:["XS","S","M","L","XL"],inventory:24,featured:true},
 {slug:"trail-knit",name:"Trail Knit Fleece",description:"Warmth without the bulk. A soft midlayer made with responsibly sourced merino and a durable recycled nylon face.",category:"Layers",price:14200,compareAt:null,image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85",colors:["Oat","Cinder"],sizes:["S","M","L","XL"],inventory:31,featured:true},
 {slug:"field-pant",name:"Field Pant",description:"A comfortable, hard-wearing trail pant with articulated knees, a relaxed taper, and considered pocketing.",category:"Bottoms",price:11800,compareAt:null,image:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=85",colors:["Moss","Clay"],sizes:["28","30","32","34","36"],inventory:18,featured:true},
 {slug:"daypack-22",name:"Daypack 22L",description:"A versatile 22-liter pack for everyday commutes and long weekends. Made from recycled ripstop with a padded laptop sleeve.",category:"Packs",price:16900,compareAt:null,image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",colors:["Pine","Black"],sizes:["One size"],inventory:15,featured:true},
 {slug:"camp-mug",name:"Camp Mug Set",description:"Two lightweight insulated stainless steel mugs, designed for coffee at camp and at home.",category:"Accessories",price:4200,compareAt:null,image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=85",colors:["Stone"],sizes:["Set of 2"],inventory:44,featured:false},
 {slug:"merino-crew",name:"Merino Trail Crew",description:"All-day merino socks with reinforced cushioning and a seamless toe for miles of comfortable movement.",category:"Accessories",price:2800,compareAt:null,image:"https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=1200&q=85",colors:["Oat","Pine"],sizes:["S/M","L/XL"],inventory:56,featured:false}
];
async function main(){
 for(const p of products){ await prisma.product.upsert({where:{slug:p.slug},update:p,create:p}); }
 const email=process.env.ADMIN_EMAIL||"admin@example.com", password=process.env.ADMIN_PASSWORD||"Change-this-password-123!";
 await prisma.user.upsert({where:{email},update:{role:"ADMIN"},create:{email,name:"Northline Admin",passwordHash:await bcrypt.hash(password,12),emailVerified:new Date(),role:"ADMIN"}});
 await prisma.coupon.upsert({where:{code:"WELCOME10"},update:{},create:{code:"WELCOME10",percentOff:10,maxUses:1000}});
 console.log(`Seeded ${products.length} products, admin ${email}, and coupon WELCOME10`);
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect());
