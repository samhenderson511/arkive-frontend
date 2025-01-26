"use client";

import { clsx } from "clsx";
import { createElement } from "react";

export const textStyles = {
  p: "prose !leading-relaxed !text-inherit",
  h1: "font-heading !leading-snug scroll-m-20 text-4xl font-headingWeight lg:text-5xl",
  h2: "font-heading !leading-snug scroll-m-20 border-b border-border pb-2 text-2xl sm:text-3xl font-headingWeight first:mt-0",
  h3: "font-heading !leading-normal scroll-m-20 text-2xl font-headingWeight",
  h4: "font-heading !leading-normal scroll-m-20 text-xl tracking-tight",
  h5: "font-heading !leading-normal scroll-m-20 text-lg tracking-tight",
  h6: "font-heading !leading-normal scroll-m-20 text-sm tracking-tight",
  span: "leading-7 text-sm",
  div: "prose w-full !leading-relaxed !max-w-screen-md prose-headings:font-heading !text-inherit prose-headings:text-inherit [&:not(.inline-flex)]:hover:prose-a:text-primary [&:not(.inline-flex)]:prose-a:text-foreground prose-strong:text-inherit marker:text-muted-foreground prose-img:rounded-lg prose-a:no-underline [&:not(.inline-flex)]:prose-a:underline",
  li: "my-6 ml-6 text-sm list-disc [&>li]:mt-2",
  code: "relative text-sm rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold",
};

export type TextProps = {
  element: keyof typeof textStyles;
  elementStyle?: keyof typeof textStyles;
} & React.HTMLAttributes<HTMLElement>;

export function Text({ element = "p", elementStyle = element, children, ...props }: TextProps) {
  const className = clsx(textStyles[elementStyle], "z-10", props.className);

  return createElement(element.toLowerCase(), { ...props, className }, children);
}
