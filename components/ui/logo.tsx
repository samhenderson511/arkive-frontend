import clsx from "clsx";
import { ComponentProps } from "react";

interface Props {
  logo: ComponentProps<"img">;
  className?: string;
}

export function Logo({ logo, className }: Props) {
  return (
    <div className={clsx("relative flex h-10 max-w-[7rem] dark:invert-0 z-0", className)}>
      <img {...logo} className={"!relative !w-auto"} />
    </div>
  );
}
