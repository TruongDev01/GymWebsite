import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = {
    base: "inline-flex items-center justify-center overflow-hidden rounded-xl text-sm font-bold leading-normal tracking-[0.015em] transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
    variants: {
        variant: {
            default: "bg-primary text-white hover:bg-primary-dark shadow-[0_0_15px_rgba(255,61,94,0.3)] hover:shadow-[0_6px_25px_rgba(255,61,94,0.4)] active:scale-[0.98]",
            outline: "bg-transparent border border-border-dark text-slate-100 hover:bg-surface-dark hover:border-slate-600",
            ghost: "hover:bg-surface-dark text-slate-100",
            social: "bg-surface-input border border-border-dark text-slate-300 hover:bg-surface-dark hover:border-slate-600 font-medium",
        },
        size: {
            default: "h-12 px-6",
            sm: "h-10 px-6",
            icon: "h-10 w-10",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof buttonVariants.variants.variant
    size?: keyof typeof buttonVariants.variants.size
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                className={cn(
                    buttonVariants.base,
                    buttonVariants.variants.variant[variant],
                    buttonVariants.variants.size[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
