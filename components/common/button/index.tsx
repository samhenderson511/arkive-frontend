"use client";
import { cn } from "@/lib/util";
import { cva, type VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import * as React from "react";
import { ComponentProps, ReactNode } from "react";

const buttonVariants = cva(
  cn(
    "flex items-center justify-center rounded-sm text-sm font-medium transition ease-out focus-visible:outline-none focus-visible:ring-1 uppercase focus-visible:ring-ring ring-opacity-0 disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-muted-foreground font-medium hover:text-primary !p-0",
      },
      size: {
        lg: "h-10 rounded-sm px-8 w-max",
        default: "h-9 px-4 py-2 w-max",
        sm: "h-8 pt-px rounded-sm px-3 text-xs w-max",
        xs: "h-6 pt-px rounded-sm px-2.5 text-xs w-max",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> &
  Omit<ComponentProps<typeof Link>, "href"> & {
    href?: string;
    children?: ReactNode;
    className?: string;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }: ButtonProps, ref: any) => {
    if (href) {
      return (
        <Link
          className={cn(buttonVariants({ variant, size, className }))}
          href={href}
          ref={ref}
          {...(props as Omit<LinkProps, "href">)}
        >
          {children}
        </Link>
      );
    } else {
      return (
        <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </button>
      );
    }
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
