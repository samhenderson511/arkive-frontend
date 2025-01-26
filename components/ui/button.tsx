"use client";

import { cn } from "@/lib";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";
import { ComponentProps, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: `bg-primary text-primary-foreground hover:bg-primary/90`,
        destructive: `bg-destructive text-destructive-foreground hover:bg-destructive/90`,
        outline:
          "border border-input hover:border-accent bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80`,
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline",
      },
      disabled: {
        true: "pointer-events-none",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm rounded-full",
        responsive: "h-9 px-3 text-sm sm:h-10 sm:px-4 rounded-full",
        sm: "h-9 rounded-md px-3 text-sm rounded-full",
        lg: "h-12 rounded-md px-8 rounded-full",
        icon: "h-10 w-10 rounded-full",
        smIcon: "h-9 w-9 rounded",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    compoundVariants: [
      {
        variant: ["default", "destructive", "secondary"],
        disabled: true,
        className: "bg-muted text-muted-foreground",
      },
      {
        variant: ["link", "ghost", "outline"],
        disabled: true,
        className: "opacity-50",
      },
    ],
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> &
  Omit<ComponentProps<typeof Link>, "href"> & {
    /** An href can be assigned to this button to turn it into a link */
    href?: string;
    children?: ReactNode;
    className?: string;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, href, children, disabled, ...props }: ButtonProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: any
  ) => {
    if (href) {
      return (
        <Link
          className={cn(buttonVariants({ variant, size, disabled }), className)}
          href={href}
          ref={ref}
          {...(props as Omit<ComponentProps<typeof Link>, "href">)}
        >
          {children}
        </Link>
      );
    } else {
      return (
        <button
          className={cn(buttonVariants({ variant, size, disabled }), className)}
          ref={ref}
          {...props}
        >
          {children}
        </button>
      );
    }
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
