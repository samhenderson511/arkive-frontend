"use client";

import { Button, Logo } from "@/components/common";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/common/accordion";
import { Badge } from "@/components/common/badge";
import Sheet, {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/common/sheet";
import { CartSheet, ModeToggle } from "@/components/layout/components";
import { useParamState } from "@/lib/hooks";
import { handleWithoutCategory } from "@/lib/util/handleWithoutCategory";
import type { Cart, LineItem } from "@medusajs/client-types";
import { ProductCategory } from "@medusajs/product";
import {
  IconBasket,
  IconGiftCard,
  IconHanger,
  IconHome,
  IconMenu,
  IconSearch,
  IconTag,
} from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import slugify from "slugify";
import { BannerBrand, RichTextPage, StoreTab } from "types/strapi";
import { NavItem } from "./nav-item";

export function MobileMenu({
  currentTab,
  departments,
  hasSaleItems,
  brands,
  pages,
  cart,
  items,
}: {
  currentTab: StoreTab;
  hasSaleItems: boolean;
  departments: ProductCategory[];
  brands: BannerBrand[];
  pages: RichTextPage[];
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
  items: Omit<LineItem, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">[];
}) {
  const pathname = usePathname();
  const [, setOpenCart] = useParamState("cart", false);
  const [, setOpenSearch] = useParamState("search", false);
  const [openMenu, setOpenMenu] = useState(false);

  const mobileItems = [
    {
      name: "Home",
      href: "/",
      icon: IconHome,
    },
    {
      name: "Search",
      onClick: () => setOpenSearch(true),
      icon: IconSearch,
    },
    {
      name: "New",
      href: "/new-arrivals",
      className: clsx(hasSaleItems && "hidden xs:flex", "text-info-foreground"),
      icon: IconHanger,
    },
    hasSaleItems && {
      name: "Sale",
      href: "/sale",
      className: "hidden xs:flex text-destructive-foreground",
      icon: IconTag,
    },
    {
      name: "Basket",
      onClick: () => setOpenCart(true),
      icon: IconBasket,
      badge: cart?.items?.length,
    },
    {
      name: "More",
      icon: IconMenu,
      onClick: () => setOpenMenu(true),
    },
  ].filter(Boolean);

  return (
    <>
      <div
        className={
          "lg:hidden flex justify-center items-stretch fixed bottom-0 w-full bg-background z-50 shadow"
        }
      >
        <nav className={"flex justify-evenly items-center p-1 max-w-xl w-full"}>
          {mobileItems.map((item) => (
            <Button
              key={item.name}
              {...item}
              variant={"ghost"}
              className={clsx(
                item.href === pathname ? "text-foreground" : "text-muted-foreground",
                "!w-16 sm:!w-[4.75rem] font-medium !capitalize relative shrink-0 pt-1 pb-0.5 !h-12 flex-col items-center gap-1 !text-xs",
                item.className
              )}
            >
              <item.icon size={20} />
              {item.name}
              {Boolean(item.badge) && (
                <Badge className="absolute z-10 top-1 right-1">{item.badge}</Badge>
              )}
            </Button>
          ))}
        </nav>
      </div>

      <Sheet open={openMenu} onOpenChange={setOpenMenu}>
        <SheetContent className={"flex flex-col h-full"}>
          <SheetHeader>
            <SheetTitle className={"flex justify-center"}>
              <SheetClose asChild>
                <Link href={"/"}>
                  <Logo logo={currentTab.attributes.Logo.data} invert={true} />
                </Link>
              </SheetClose>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col overflow-x-hidden overflow-y-auto gap-1 grow">
            <SheetClose asChild>
              <Button
                variant={"ghost"}
                size={"lg"}
                href={"/new-arrivals"}
                className={"!text-info-foreground !w-full shrink-0"}
              >
                New Arrivals
              </Button>
            </SheetClose>

            <Accordion type={"single"} collapsible className={"flex flex-col gap-1"}>
              {departments?.map((dep) => (
                <AccordionItem
                  key={handleWithoutCategory(dep.handle)}
                  value={handleWithoutCategory(dep.handle)}
                  className={"border-none"}
                >
                  <AccordionTrigger className={"py-0"}>
                    <SheetClose asChild>
                      <Button
                        href={handleWithoutCategory(dep.handle)}
                        variant={"link"}
                        size={"lg"}
                        className="!w-full ml-[1.625rem] !no-underline"
                      >
                        {dep.name}
                      </Button>
                    </SheetClose>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className={"p-1"}>
                      {dep.category_children?.map((subDep: ProductCategory) => (
                        <NavItem
                          key={handleWithoutCategory(subDep.handle)}
                          onClick={() => setOpenMenu(false)}
                          title={subDep.name}
                          href={handleWithoutCategory(subDep.handle)}
                          className={"px-3"}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}

              <AccordionItem value={"brands"} className={"border-none"}>
                <AccordionTrigger className={"py-0"}>
                  <SheetClose asChild>
                    <Button
                      href={`/brands`}
                      variant={"link"}
                      size={"lg"}
                      className="!w-full ml-[1.625rem] !no-underline"
                    >
                      Brands
                    </Button>
                  </SheetClose>
                </AccordionTrigger>
                <AccordionContent>
                  <div className={"p-1"}>
                    {brands?.map((brand) => (
                      <NavItem
                        key={brand.attributes?.BrandBanner?.Title}
                        logo={brand.attributes?.Logo.data}
                        title={brand.attributes?.BrandBanner?.Title}
                        className={"px-3 py-1.5"}
                        onClick={() => setOpenMenu(false)}
                        href={`/brands/${slugify(brand.attributes?.BrandBanner?.Title, {
                          lower: true,
                        })}`}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value={"support"} className={"border-none"}>
                <AccordionTrigger className={"py-0"}>
                  <SheetClose asChild>
                    <Button
                      href={`/support`}
                      variant={"link"}
                      size={"lg"}
                      className="!w-full ml-[1.625rem] !no-underline"
                    >
                      Support
                    </Button>
                  </SheetClose>
                </AccordionTrigger>
                <AccordionContent>
                  <div className={"p-1"}>
                    <SheetClose asChild>
                      <NavItem href={`/contact`} title={"Contact"} />
                    </SheetClose>
                    <SheetClose asChild>
                      <NavItem href={`/support/faqs`} title={"FAQs"} />
                    </SheetClose>
                    {pages
                      .filter((page) => page.attributes.ShowInMainNav)
                      .map((page) => (
                        <SheetClose key={page.id} asChild>
                          <NavItem
                            href={`/support/${page.attributes.PageSlug}`}
                            title={page.attributes.PageTitle}
                          />
                        </SheetClose>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {hasSaleItems && (
              <SheetClose asChild>
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  href={`/sale`}
                  className={"!text-destructive-foreground !w-full shrink-0"}
                >
                  Sale
                </Button>
              </SheetClose>
            )}

            <hr className={"border-border"} />

            <SheetClose asChild>
              <Button
                variant={"ghost"}
                size={"lg"}
                href={`/account`}
                className={"!w-full shrink-0"}
              >
                My Account
              </Button>
            </SheetClose>

            <div className={"w-full flex gap-1 my-4 justify-center"}>
              <Button title={"Gift Cards"} size="icon" variant="ghost" className="!duration-0">
                <IconGiftCard size={20} />
              </Button>
              <ModeToggle />
              <CartSheet items={items} cart={cart} />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default MobileMenu;
