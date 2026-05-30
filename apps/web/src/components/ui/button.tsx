"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button V5 — Health premium aesthetic
 * Deep teal con warm shadows. NO neon glow cyberpunk.
 */
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-primary text-white shadow-[0_8px_24px_rgba(15,118,110,0.3)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.4)] hover:bg-brand-primary-hover hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-bg-surface text-fg-primary border border-fg-primary/10 shadow-sm hover:bg-bg-raised hover:border-fg-primary/20",
        ghost:
          "text-fg-primary hover:bg-fg-primary/[0.05]",
        outline:
          "border border-brand-primary/40 text-brand-primary hover:bg-brand-primary/[0.05] hover:border-brand-primary",
        warm:
          "text-white font-semibold shadow-[0_8px_24px_rgba(244,168,138,0.4)] hover:shadow-[0_12px_32px_rgba(224,120,86,0.5)] hover:scale-[1.02] active:scale-[0.98] bg-[linear-gradient(135deg,#F4A88A_0%,#E07856_100%)]",
        aurora:
          "text-white font-semibold shadow-[0_8px_24px_rgba(15,118,110,0.3)] hover:shadow-[0_12px_40px_rgba(244,168,138,0.4)] hover:scale-[1.02] active:scale-[0.98] bg-[linear-gradient(135deg,#0F766E_0%,#8BA888_50%,#F4A88A_100%)] bg-[length:200%_100%] hover:bg-[position:100%_0]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
