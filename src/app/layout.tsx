import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";
export const metadata:Metadata={title:{default:"Northline — Make room for outside",template:"%s · Northline"},description:"Thoughtful outdoor essentials, made to move with you from first light to last call.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteShell>{children}</SiteShell></body></html>}

