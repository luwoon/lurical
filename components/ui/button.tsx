import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        locked:
          "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",
        default:
          "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500",
        primary:
          "bg-sky-400 text-primary-foreground hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0",
        primaryOutline: "bg-white text-sky-500 hover:bg-slate-100",
        secondary:
          "bg-green-500 text-primary-foreground hover:bg-green-500/90 border-green-600 border-b-4 active:border-b-0",
        secondaryOutline: "bg-white text-green-500 hover:bg-slate-100",
        danger:
          "bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
        dangerOutline: "bg-white text-rose-500 hover:bg-slate-100",
        super:
          "bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
        superOutline: "bg-white text-indigo-500 hover:bg-slate-100",
        ghost:
          "bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100",
        sidebar:
          "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none",
        sidebarOutline:
          "bg-[#5B9984]/15 text-[#5B9984] border-[#5B9984]/60 border-2 hover:bg-[#5B9984]/20 transition-none",

        green:
          "bg-[#366640] text-primary-foreground hover:bg-[#366640]/90 border-[#294d30] border-b-4 active:border-b-0",
        greenOutline: "bg-white text-[#366640] hover:bg-slate-100",
        khaki:
          "bg-[#A58842] text-primary-foreground hover:bg-[#A58842]/90 border-[#856d35] border-b-4 active:border-b-0",
        khakiOutline: "bg-white text-[#A58842] hover:bg-slate-100",
        blue: "bg-[#5B9984] text-primary-foreground hover:bg-[#5B9984]/90 border-[#4d8075] border-b-4 active:border-b-0",
        blueOutline: "bg-white text-[#5B9984] hover:bg-slate-100",
        yellow:
          "bg-[#F7AE2E] text-primary-foreground hover:bg-[#F7AE2E]/90 border-[#db9a27] border-b-4 active:border-b-0",
        yellowOutline: "bg-white text-[#F7AE2E] hover:bg-slate-100",
        orange:
          "bg-[#ED6B27] text-primary-foreground hover:bg-[#ED6B27]/90 border-[#cf5d21] border-b-4 active:border-b-0",
        orangeOutline: "bg-white text-[#ED6B27] hover:bg-slate-100",
        red: "bg-[#C83C23] text-primary-foreground hover:bg-[#C83C23]/90 border-[#ad331d] border-b-4 active:border-b-0",
        redOutline: "bg-white text-[#C83C23] hover:bg-slate-100",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
