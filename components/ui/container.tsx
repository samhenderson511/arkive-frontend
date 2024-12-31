import clsx from "clsx";
import { HTMLAttributes } from "react";

export function Container({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("max-w-screen-2xl flex flex-col w-full px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
