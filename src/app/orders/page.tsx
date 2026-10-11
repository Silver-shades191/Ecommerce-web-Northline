import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { money } from "@/lib/format";
export default async function Orders(){const s=await auth();if(!s?.user)redirect("/login");const orders=await db.order.findMany({where:{userId:s.user.id},include:{items:true},orderBy:{createdAt:"desc"}});return <div className="page-shell account-page"><div className="breadcrumbs"><a href="/account">Account</a><span>/</span><span>Orders</span></div><div className="eyebrow">YOUR NORTHLINE</div><h1>Order history.</h1>{orders.length?orders.map(o=><article className="account-panel order-history" key={o.id}><div className="panel-heading"><h2>Order #{o.number}</h2><span className="status-pill">{o.status.toLowerCase()}</span></div><p>{new Intl.DateTimeFormat("en-US",{dateStyle:"long"}).format(o.createdAt)} · {money(o.total)}</p>{o.items.map(i=><div className="order-item" key={i.id}><span>{i.quantity} × {i.name}</span><span>{money(i.unitPrice*i.quantity)}</span></div>)}</article>):<div className="empty-state compact"><h2>No orders just yet.</h2><a className="button button-dark" href="/shop">Find your next favorite</a></div>}</div>}

