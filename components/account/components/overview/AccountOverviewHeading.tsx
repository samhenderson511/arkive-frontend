import { cn } from "@/lib/util";
import { ComponentProps, ReactNode } from "react";

export function AccountOverviewHeading({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
} & ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}
