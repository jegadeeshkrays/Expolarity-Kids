import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-card hover:scale-105 active:scale-95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:scale-105 active:scale-95",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft hover:scale-105 active:scale-95",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        leaf: "relative px-8 py-4 font-bold text-white rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-br from-garden-green to-emerald-600 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 border-2 border-emerald-700/30",
        wood: "relative px-8 py-4 font-bold text-garden-brown rounded-lg bg-gradient-to-br from-amber-200 to-amber-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 border-2 border-amber-600/30",
        glass: "bg-white/80 backdrop-blur-md text-foreground border border-white/30 shadow-card hover:bg-white/90 hover:scale-105 active:scale-95",
        hero: "bg-gradient-primary text-white shadow-glow hover:shadow-xl hover:scale-105 active:scale-95 text-lg py-6 px-8",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
