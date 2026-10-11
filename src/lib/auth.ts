import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { enforceRateLimit } from "@/lib/security";
export const { handlers, auth, signIn, signOut } = NextAuth({
 adapter: PrismaAdapter(db),
 session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
 pages: { signIn: "/login" },
 providers: [Google, Credentials({ name:"Email and password", credentials:{ email:{label:"Email",type:"email"}, password:{label:"Password",type:"password"} }, async authorize(input,request){ const ip=request.headers.get("x-forwarded-for")?.split(",")[0]||"unknown"; try{await enforceRateLimit(`credentials:${ip}`,10,900)}catch{return null;} const data=z.object({email:z.string().email(),password:z.string().min(1)}).safeParse(input); if(!data.success)return null; const user=await db.user.findUnique({where:{email:data.data.email}}); if(!user?.passwordHash||!user.emailVerified)return null; if(!await bcrypt.compare(data.data.password,user.passwordHash))return null; return {id:user.id,email:user.email,name:user.name,role:user.role}; } })],
 callbacks: { async jwt({token,user}) { if(user){token.role=(user as {role?:string}).role??"CUSTOMER"; token.uid=user.id;} else if(token.sub){const u=await db.user.findUnique({where:{id:token.sub},select:{role:true}});token.role=u?.role??"CUSTOMER";} return token; }, async session({session,token}) { if(session.user){session.user.id=String(token.uid??token.sub);session.user.role=String(token.role??"CUSTOMER") as "CUSTOMER"|"ADMIN";}return session;} }
});

