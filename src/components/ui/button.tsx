import * as React from "react";
import { cn } from "@/lib/utils";
type ButtonProps=React.ButtonHTMLAttributes<HTMLButtonElement>&{variant?:"default"|"outline"|"ghost";size?:"default"|"sm"};
export const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(({className,variant="default",size="default",...props},ref)=><button ref={ref} className={cn("button",variant==="default"&&"button-dark",variant==="outline"&&"button-outline-light",variant==="ghost"&&"wishlist-button",size==="sm"&&"button-sm",className)} {...props}/>);
Button.displayName="Button";
