"use client";

import { cn, NestedRepeaterLink } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "./button";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "./navigation-menu";
import { Text } from "./text";

/**
 * LinkOrSubMenu component renders either a simple link or a dropdown menu with potential submenus.
 * It's designed for use in navigation systems, supporting up to two levels of nested menus.
 *
 * @component
 * @param {Object} props - The component props
 * @param {NestedRepeaterLink} props.link - The link object containing label, URL, and potential submenu items
 */
export function LinkOrSubMenu({ link }: { link: NestedRepeaterLink }) {
  const pathname = usePathname();

  const buttonVariant = { size: "sm", variant: "ghost" } as const;
  const buttonClassName = cn("gap-3", link.url === pathname && "bg-accent text-accent-foreground");

  // Check if the link has a submenu
  if ("subMenu" in link && link.subMenu) {
    return (
      <NavigationMenuItem value={link.label}>
        <NavigationMenuTrigger
          className={cn(buttonVariants({ className: buttonClassName, ...buttonVariant }))}
        >
          <NavigationMenuLink asChild>
            <Link href={encodeURI(link.url).toLowerCase() || ""}>{link.label}</Link>
          </NavigationMenuLink>
        </NavigationMenuTrigger>

        <NavigationMenuContent asChild>
          <div className="flex w-full flex-col gap-4 px-8 py-4">
            <Text element="h5" className="font-semibold">
              {link.label}
            </Text>

            <ul className="grid grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4 min-w-[75%] w-max">
              {link.subMenu.map((subLink) => (
                <li key={subLink.url}>
                  <NavigationMenuLink asChild>
                    <Button
                      variant="link"
                      className="px-0 gap-5 w-full justify-start"
                      href={encodeURI(subLink.url).toLowerCase() || ""}
                    >
                      {link.subMenu?.some(({ logo }) => logo) ?
                        <>
                          {subLink.logo ?
                            <Image
                              src={subLink.logo?.url}
                              alt={subLink.logo?.alternativeText || ""}
                              className="brightness-50 size-8"
                              width={32}
                              height={32}
                            />
                          : <div className="size-8 bg-muted rounded-full" />}
                          {subLink.label}
                        </>
                      : subLink.label}
                    </Button>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  // Render a simple link if there's no submenu
  return (
    <NavigationMenuItem value={link.label}>
      <NavigationMenuLink asChild>
        <Button
          {...buttonVariant}
          href={encodeURI(link.url).toLowerCase()}
          className={buttonClassName}
        >
          {link.label}
        </Button>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
