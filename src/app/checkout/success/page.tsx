"use client";
import { useEffect } from "react";
import { useCart } from "@/components/site-shell";
export default function CheckoutSuccess(){const {clear}=useCart();useEffect(()=>{clear()},[clear]);return <section className="empty-state"><div className="empty-icon">✓</div><div className="eyebrow">ORDER CONFIRMED</div><h1>Good things are on the way.</h1><p>Your payment is complete. We’ve sent your confirmation email and you can follow your order from your account.</p><a className="button button-dark" href="/orders">View your orders</a></section>}
