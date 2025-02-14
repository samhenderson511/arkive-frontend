import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";

interface Props {
  logo: ComponentProps<"img">;
  className?: string;
}

const Logo = forwardRef(({ logo, className }: Props, ref) => (
  <div
    className={clsx("relative flex h-10 max-w-[7rem] dark:invert-0 z-0", className)}
    ref={ref as any}
  >
    <img {...logo} className={"!relative !w-auto"} />
  </div>
));
export { Logo };
