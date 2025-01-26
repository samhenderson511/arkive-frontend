"use client";

import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, textStyles } from "@/components";
import { cn, RepeaterLink, useGlobal, useMenuNavigation } from "@/lib";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";

export function NavigationSheet({ links }: { links: RepeaterLink[] }) {
  const {
    menuStack,
    currentMenu,
    navigateToSubmenu,
    navigateBack,
    parentMenuItem,
    resetMenuStack,
  } = useMenuNavigation(links);
  const [parent] = useAutoAnimate();
  const { openMenu, setOpenMenu } = useGlobal();

  const handleOpenChange = (open: boolean) => {
    setOpenMenu(open);

    if (!open) {
      resetMenuStack();
    }
  };

  return (
    <Sheet open={openMenu} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="flex flex-col h-full">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Main Menu</SheetTitle>
          </SheetHeader>
        </VisuallyHidden>

        <nav className={"grow flex flex-col items-center"}>
          <ul className={"flex flex-col p-2 gap-2 w-full grow justify-center"} ref={parent}>
            {/* Submenu back button */}
            {menuStack.length > 1 && (
              <li key={parentMenuItem?.url}>
                <Button
                  className="px-0 w-full gap-3 justify-start"
                  variant={"link"}
                  onClick={navigateBack}
                >
                  <IconChevronLeft size={"1rem"} />
                  Back
                </Button>
              </li>
            )}

            {/* Menu items */}
            {currentMenu.map((link) => (
              <li key={link.url} className="flex items-center gap-3">
                <Button
                  className={cn("w-full p-0 justify-start gap-5 !font-heading", textStyles.h4)}
                  variant={"link"}
                  href={link.url}
                  onClick={() => {
                    if (!link.url && "subMenu" in link) {
                      navigateToSubmenu(link.subMenu as any);
                    }
                  }}
                >
                  {link.logo && (
                    <Image
                      src={link.logo?.url}
                      alt={link.logo?.alternativeText || ""}
                      className="brightness-50 size-8"
                      width={32}
                      height={32}
                    />
                  )}
                  {link.label}
                </Button>

                {"subMenu" in link && link.subMenu ?
                  <Button
                    className="p-0"
                    size={"icon"}
                    variant={"link"}
                    onClick={() => navigateToSubmenu(link.subMenu as any)}
                  >
                    <IconChevronRight size={"1.25rem"} />
                  </Button>
                : null}
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
