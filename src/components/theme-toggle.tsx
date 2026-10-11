"use client";
import { useEffect,useState } from "react";
import { Moon,Sun } from "lucide-react";
export function ThemeToggle(){const [dark,setDark]=useState(false);useEffect(()=>{const v=localStorage.getItem("northline-theme");const on=v==="dark";setDark(on);document.documentElement.classList.toggle("dark",on)},[]);function toggle(){const n=!dark;setDark(n);document.documentElement.classList.toggle("dark",n);localStorage.setItem("northline-theme",n?"dark":"light");}return <button className="icon-button theme-toggle" aria-label={`Switch to ${dark?"light":"dark"} mode`} onClick={toggle}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button>}
