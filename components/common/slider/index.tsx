"use client";

import { cn } from "@/lib/util";
import { formatAmount } from "@/lib/util/prices";
import type { Region } from "@medusajs/client-types";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { Tooltip } from "../tooltip";

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root> & { region: Region },
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    region: Region;
  }
>(({ className, region, ...props }, ref) => {
  const [value, setValue] = React.useState(props.defaultValue);
  const [open, setOpen] = React.useState(false);

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      value={value}
      onValueChange={setValue}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {props.defaultValue.map((v, i) => (
        <Tooltip
          key={v}
          open={open}
          content={formatAmount({
            amount: value[i],
            region: region,
          })}
        >
          <SliderThumb onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} />
        </Tooltip>
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

const SliderThumb = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Thumb
    className={cn(
      "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));

export { Slider };
