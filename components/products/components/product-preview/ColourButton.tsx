"use client";
import { Tooltip } from "@/components/common";
import colours from "@/lib/colours.json";
import clsx from "clsx";
import { ComponentProps } from "react";

export function ColourButton({
  colour,
  colourGroup1,
  colourGroup2,
  className,
  ...rest
}: {
  colour: string;
  colourGroup1: string;
  colourGroup2?: string;
} & ComponentProps<"li">) {
  const primary = colours[colourGroup1?.toLowerCase()]?.tailwindBg || "bg-muted border-border";
  const secondary = colours[colourGroup2?.toLowerCase()]?.tailwindBg || "bg-muted-foreground";

  return (
    <Tooltip content={colour}>
      <li
        className={clsx(
          `relative flex items-center justify-center overflow-hidden transition  ease-out border rounded-sm h-6 w-6 hover:brightness-90 dark:hover:brightness-110 cursor-pointer !bg-transparent z-10 aria-disabled:opacity-50 aria-disabled:border-none aria-disabled:cursor-not-allowed aria-disabled:!brightness-100`,
          className,
          primary
        )}
        {...rest}
      >
        <div className="rotate-45 -z-10 h-14 absolute w-14 flex gap-0.5">
          <div className={clsx("w-full", primary)} />
          {colourGroup2 && <div className={clsx("w-full", secondary)} />}
        </div>
      </li>
    </Tooltip>
  );
}
