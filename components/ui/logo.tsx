import clsx from "clsx";
import Image from "next/image";
import { ComponentProps, forwardRef } from "react";

interface Props {
  logo: ComponentProps<typeof Image>;
  className?: string;
}

const Logo = forwardRef(({ logo, className }: Props, ref) => (
  <div
    className={clsx("relative flex h-10 max-w-[7rem] dark:invert-0 z-0", className)}
    ref={ref as any}
  >
    <Image {...logo} className={"!relative !w-auto"} fill />
  </div>
));
export { Logo };
