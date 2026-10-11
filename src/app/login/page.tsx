import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export default function Login(){return <section className="auth-page"><Suspense fallback={<div className="auth-card">Loading sign in…</div>}><AuthForm mode="login"/></Suspense></section>}
