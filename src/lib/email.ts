import { Resend } from "resend";
export async function sendEmail(to:string,subject:string,html:string){
 if(!process.env.RESEND_API_KEY)return false;
 const resend=new Resend(process.env.RESEND_API_KEY);
 const {error}=await resend.emails.send({from:process.env.EMAIL_FROM||"Northline <onboarding@resend.dev>",to,subject,html});
 if(error)throw new Error(error.message); return true;
}
