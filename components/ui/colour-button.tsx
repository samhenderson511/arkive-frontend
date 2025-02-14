"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import colours from "@/lib/colour-groups.json";
import clsx from "clsx";
import { ComponentProps } from "react";

export interface ColourButtonProps extends ComponentProps<"div"> {
  colour: string;
  colourGroups: (string | undefined)[];
  tooltip?: boolean;
}

export function ColourButton({
  colour,
  colourGroups,
  id,
  tooltip = true,
  ...rest
}: ColourButtonProps) {
  const colourGroupClasses = colourGroups.map(
    (group) => colours[(group as keyof typeof colours) || "Neutral"]
  );

  if (!tooltip) {
    return (
      <ColourButtonRoot {...rest}>
        {colourGroupClasses.map((colourGroupClass, i) => (
          <div key={id + colourGroupClass + i} className={clsx("w-full", colourGroupClass)} />
        ))}
      </ColourButtonRoot>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <li>
          <ColourButtonRoot {...rest}>
            {colourGroupClasses.map((colourGroupClass, i) => (
              <div key={id + colourGroupClass + i} className={clsx("w-full", colourGroupClass)} />
            ))}
          </ColourButtonRoot>
        </li>
      </TooltipTrigger>

      <TooltipContent>{colour}</TooltipContent>
    </Tooltip>
  );
}

export function ColourButtonRoot({ children, className, ...rest }: ComponentProps<"div">) {
  return (
    <div
      className={clsx(
        `relative size-6 rounded-full inline-flex items-center justify-center overflow-hidden transition  ease-out border border-border hover:brightness-90 dark:hover:brightness-110 cursor-pointer !bg-transparent z-10 aria-disabled:opacity-50 aria-disabled:border-none aria-disabled:cursor-not-allowed aria-disabled:!brightness-100`,
        className
      )}
      {...rest}
    >
      <div className="rotate-45 -z-10 size-full rounded-full border border-background overflow-hidden flex gap-px">
        {children}
      </div>
    </div>
  );
}
