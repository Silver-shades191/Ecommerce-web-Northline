import { Suspense } from "react";
import { ResetPassword } from "@/components/auth-form";
export default function ForgotPassword(){return <section className="auth-page"><Suspense fallback={<div className="auth-card">Loading…</div>}><ResetPassword/></Suspense></section>}
