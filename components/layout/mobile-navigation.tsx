"use client";

import { Button } from "@/components";
import { useGlobal } from "@/lib";
import {
  IconBasketFilled,
  IconHomeFilled,
  IconMenu2,
  IconSearch,
  IconShirtFilled,
} from "@tabler/icons-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export function MobileNavigation() {
  const { setOpenMenu, setOpenSearch, setOpenCart } = useGlobal();
  const pathname = usePathname();

  const items = [
    {
      name: "Home",
      href: "/",
      icon: IconHomeFilled,
    },
    {
      name: "Search",
      icon: IconSearch,
      onClick: () => setOpenSearch(true),
    },
    {
      name: "New",
      href: "/new-arrivals",
      icon: IconShirtFilled,
    },
    {
      name: "Basket",
      icon: IconBasketFilled,
      onClick: () => setOpenCart(true),
    },
    {
      name: "More",
      icon: IconMenu2,
      onClick: () => setOpenMenu(true),
    },
  ];

  return (
    <div className="fixed z-50 flex lg:hidden bottom-0 w-full p-1 bg-gradient-to-t from-background/50 to-transparent">
      <nav className="flex h-16 w-full shadow items-center justify-evenly rounded-lg bg-background/90 border border-border/50 backdrop-blur-lg overflow-clip">
        {items.map(({ name, href, icon: Icon, ...props }) => (
          <Button
            key={name}
            href={href}
            variant={"ghost"}
            size={"icon"}
            className={clsx(
              pathname !== href && "text-muted-foreground",
              "flex-col text-xs w-full h-full rounded-none gap-1"
            )}
            {...props}
          >
            <Icon />
            {name}
          </Button>
        ))}
      </nav>
    </div>
  );
}
