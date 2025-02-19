"use client";

import { NestedRepeaterLink, useElementWidth, useGlobal, useIsScrolled } from "@/lib";
import { IconBasketFilled, IconSearch, IconUserFilled } from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { Button } from "../ui/button";
import { LinkOrSubMenu } from "../ui/link-or-submenu";
import { Logo } from "../ui/logo";
import { NavigationMenu } from "../ui/navigation-menu";

interface Props {
  links: NestedRepeaterLink[];
  scrollThreshold: number;
  logo: ComponentProps<"img">;
}

export function BottomNavigation({ links, scrollThreshold, logo }: Props) {
  const isScrolled = useIsScrolled(scrollThreshold);
  const [width, ref] = useElementWidth<HTMLAnchorElement>();
  const [value, onValueChange] = useState("");

  const { setOpenSearch, setOpenCart } = useGlobal();

  const ScrolledClassName =
    isScrolled ? "bg-background/95 backdrop-blur-xl" : "bg-background backdrop-blur-0";

  const rightLinks = [
    {
      name: "Search",
      icon: IconSearch,
      onClick: () => setOpenSearch(true),
    },
    {
      name: "Basket",
      icon: IconBasketFilled,
      onClick: () => setOpenCart(true),
    },
    {
      name: "Login/Register",
      icon: IconUserFilled,
      href: "/account",
    },
  ];

  return (
    <NavigationMenu
      value={value}
      classNames={{
        viewport: ScrolledClassName,
      }}
      onValueChange={onValueChange}
      className={clsx(
        "h-16 border-b border-border/25 flex justify-center transition ease-out sticky top-0 z-50 px-4 lg:px-8",
        Boolean(value) ? "rounded-b-none" : "rounded-b-lg",
        ScrolledClassName
      )}
    >
      <div className="w-full max-w-screen-2xl flex">
        <Link
          ref={ref}
          href={"/"}
          className={clsx(
            "lg:absolute flex items-center h-full transition ease-out duration-300",
            isScrolled ? "lg:translate-x-0 lg:opacity-100" : "lg:-translate-x-32 lg:opacity-0"
          )}
        >
          <Logo logo={logo} />
        </Link>

        <ul
          className="lg:flex hidden items-center gap-3 transition-[margin]"
          style={{ marginLeft: isScrolled ? width + 32 : 0 }}
        >
          {links.map(({ url, label, subMenu }) => (
            <LinkOrSubMenu key={url} link={{ url, label, subMenu }} />
          ))}
        </ul>

        <ul className="flex grow items-center justify-end gap-3">
          {rightLinks.map(({ name, icon: Icon, href, ...props }, index) => (
            <li key={name} className={clsx(index !== rightLinks.length - 1 && "lg:flex hidden")}>
              <Button href={href} variant={"ghost"} size={"sm"} className="gap-5" {...props}>
                {name}
                <Icon className="size-5 text-muted-foreground" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </NavigationMenu>
  );
}
