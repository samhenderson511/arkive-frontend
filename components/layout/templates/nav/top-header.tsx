"use client";

import { Button, Logo } from "@/components/common";
import { useIsScrolled } from "@/lib/hooks/useIsScrolled";
import { cn } from "@/lib/util";
import { barlow } from "app/fonts";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Media, StoreTab } from "types/strapi";

interface Props {
  currentTab: string;
  logo: Media;
  tabs: StoreTab[];
}

export const TopHeader = ({ currentTab, tabs, logo }: Props) => {
  const router = useRouter();
  const isScrolled = useIsScrolled(48);

  return (
    <header className="fixed z-50 flex items-center justify-center w-full pt-16 border-b gap-1 -top-16 md:top-0 md:pt-0 lg:border-none border-border md:sticky lg:relative peer bg-background text-foreground md:h-14 md:px-6">
      <div className="flex flex-row items-center justify-between flex-1 md:gap-1 max-w-8xl">
        <div
          className={clsx(
            "flex absolute md:relative md:top-0 top-28 bg-background lg:-mx-1 items-center md:border-none min-w-max md:flex-1 divide-x w-full md:justify-start justify-center divide-border order-2 md:order-1 md:h-full overflow-hidden transition-[height,padding] ease-in",
            isScrolled || tabs.length === 1 ? "h-0" : "h-14 border-t border-border py-4"
          )}
        >
          {tabs.map((tab) => {
            if (tabs.length === 1) {
              return null;
            }

            return (
              <Button
                variant={"link"}
                key={tab.attributes.Title}
                className={cn(
                  tab.attributes.CategoryHandle === currentTab ?
                    "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
                  "uppercase !px-4 !font-bold transition flex items-center ease-out h-full !text-sm",
                  barlow.className
                )}
                href={`https://${tab.attributes.Domain}`}
              >
                {tab.attributes.Title}
              </Button>
            );
          })}
        </div>
        <Link className={"order-1 shrink-0 px-4 md:order-2 h-12 flex items-center"} href={"/"}>
          <Logo logo={logo} />
        </Link>
        <div className="flex items-center justify-end flex-1 order-3 h-full -mx-1 gap-1">
          <Link
            href={"/account"}
            className={clsx(
              barlow.className,
              "text-muted-foreground shrink-0 font-bold hover:text-foreground uppercase px-4 transition flex items-center ease-out h-full text-sm"
            )}
          >
            My Account
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
