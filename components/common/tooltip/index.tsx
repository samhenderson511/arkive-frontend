"use client";
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/util";
import { toLower } from "lodash";

interface Props extends React.ComponentProps<typeof TooltipRoot> {
  content: string;
  children: React.ReactNode;
}

const Tooltip = ({ content, children, defaultOpen, ...rest }: Props) => (
  <TooltipProvider>
    <TooltipRoot {...rest}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <span className={"capitalize"}>{toLower(content)}</span>
      </TooltipContent>
    </TooltipRoot>
  </TooltipProvider>
);

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-fade-in data-[state=closed]:animate-fade-out data-[state=open]:scale-100 data-[state=closed]:scale-50 data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:animate-origin-bottom transition duration-200 ease-out",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
