import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export default function Signup(){return <section className="auth-page"><Suspense fallback={<div className="auth-card">Loading sign up…</div>}><AuthForm mode="signup"/></Suspense></section>}
