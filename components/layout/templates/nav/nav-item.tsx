import { Logo } from "@/components/common";
import { cn } from "@/lib/util";
import Link from "next/link";
import { ComponentProps } from "react";
import { Media } from "types/strapi";

interface Props extends ComponentProps<"li"> {
  title: string;
  href: string;
  logo?: Media;
}

export const NavItem = ({ className, title, href, logo, ...props }: Props) => {
  return (
    <li
      key={href}
      className={"flex transition rounded hover:ring-1 ring-border group ring-0"}
      {...props}
    >
      <Link
        href={href}
        className={cn("flex w-full items-center h-full px-6 py-3 gap-5", className)}
      >
        {logo && <Logo className={"opacity-50 !max-w-[2rem]"} logo={logo} />}
        <h3 className="text-sm uppercase">{title}</h3>
      </Link>
    </li>
  );
};
