"use client";

import { Logo } from "@/components/common";
import { NavigationMenu, NavigationMenuList } from "@/components/common/navigation-menu";
import { CartSheet, ModeToggle } from "@/components/layout/components";
import { SearchSheet } from "@/components/search/templates/desktop-search-modal/SearchSheet";
import { useIsScrolled } from "@/lib/hooks/useIsScrolled";
import type { Cart, LineItem, Region } from "@medusajs/client-types";
import { ProductCategory } from "@medusajs/product";
import clsx from "clsx";
import Link from "next/link";
import { useRef, useState } from "react";
import { BannerBrand, RichTextPage, StoreTab } from "types/strapi";
import { Arkive } from "./arkive";
import { Brands } from "./brands";
import { Departments } from "./departments";
import { NewArrivals } from "./new-arrivals";
import { Sale } from "./sale";

interface Props {
  currentTab: StoreTab;
  hasSaleItems: boolean;
  departments: ProductCategory[];
  pages: RichTextPage[];
  brands: BannerBrand[];
  region: Region;
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
  cartItems: Omit<LineItem, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">[];
}

export const BottomHeader = ({
  currentTab,
  departments,
  hasSaleItems,
  pages,
  region,
  brands,
  cart,
  cartItems,
}: Props) => {
  const [navMargin, setNavMargin] = useState(0);
  const isScrolled = useIsScrolled(48);
  const logo = currentTab.attributes.Logo.data;

  const logoRef = useRef(null);

  const updateNavMargin = () => {
    const logoWidth = logoRef.current ? logoRef.current.offsetWidth : 0;
    setNavMargin(logoWidth + 24); // Plus 24px for additional margin
  };

  return (
    <header
      className={
        "px-6 bg-background border-border/50 mx-auto top-0 inset-x-0 z-50 group sticky transition border-y hover:bg-background peer-hover:bg-background hover:text-foreground hidden lg:flex justify-center peer-hover:text-foreground hover:delay-0 peer-hover:delay-0 h-16 ease-out"
      }
    >
      <NavigationMenu className="flex items-center justify-between flex-1 h-full text-sm max-w-8xl transition-colors">
        <div className="flex items-center justify-between w-full h-full">
          <Link
            ref={logoRef}
            href={"/"}
            className={clsx(
              "absolute transition ease-out duration-300",
              isScrolled ? "translate-x-0 opacity-100" : "-translate-x-32 opacity-0"
            )}
          >
            <Logo logo={logo} invert={true} onLoad={updateNavMargin} />
          </Link>

          <div
            className="sm:flex items-center transition-[margin] ease-out justify-between h-full gap-4 grow hidden"
            style={{ marginLeft: isScrolled ? navMargin : 0 }}
          >
            <NavigationMenuList>
              <NewArrivals className={"!text-info-foreground"} />
              <Departments departments={departments} />
              <Brands brands={brands} />
              <Arkive pages={pages} />
              {hasSaleItems && <Sale className={"!text-destructive-foreground"} />}
            </NavigationMenuList>
            <div className="flex items-center justify-end grow gap-4 [&>*]:duration-0">
              <SearchSheet
                category={currentTab.attributes.CategoryHandle.replace("/", "")}
                departments={departments}
                brands={brands}
                region={region}
              />
              {/* <Button
                title={"Gift Cards"}
                size="icon"
                variant="ghost"
                className="!duration-0"
              >
                <IconGiftCard size={20} />
              </Button> */}
              <ModeToggle />
              <CartSheet cart={cart} items={cartItems} />
            </div>
          </div>
        </div>
      </NavigationMenu>
    </header>
  );
};

export default BottomHeader;
