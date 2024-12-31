import { getCategoryBrands, getDepartments, retrieveCart } from "@/lib/data";
import { enrichLineItems } from "@/lib/data/enrichLineItems";
import type { Region } from "@medusajs/client-types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import slugify from "slugify";
import { RichTextPage, StoreTab } from "types/strapi";
import { BottomHeader } from "./bottom-header";
import { MobileMenu } from "./MobileMenu";
import { TopHeader } from "./top-header";

interface Props {
  storeTab: string;
  tabs: StoreTab[];
  pages: RichTextPage[];
  hasSaleItems: boolean;
  regionId: string;
  region: Region;
}

export async function Nav({ tabs, pages, storeTab, regionId, region, hasSaleItems }: Props) {
  const cart = await retrieveCart();
  const cartItems = await enrichLineItems(cart?.items, regionId);
  const categories = await getDepartments(storeTab);
  const brands = await getCategoryBrands(storeTab);

  const departments = categories
    ?.filter((cat) => {
      const split = cat.handle.split("/");
      return split?.[1] === slugify(storeTab || "") && split?.length === 3;
    })
    ?.sort((a, b) => a.name?.localeCompare(b.name));

  const currentTab = tabs.find((tab) => tab.attributes.CategoryHandle === storeTab);

  if (!currentTab) {
    return notFound();
  }

  return (
    <>
      <TopHeader
        currentTab={currentTab.attributes.CategoryHandle}
        tabs={tabs}
        logo={currentTab.attributes.Logo.data}
      />

      <BottomHeader
        hasSaleItems={hasSaleItems}
        currentTab={currentTab}
        departments={departments}
        pages={pages}
        brands={brands}
        region={region}
        cart={cart}
        cartItems={cartItems}
      />

      <MobileMenu
        currentTab={currentTab}
        departments={departments}
        hasSaleItems={hasSaleItems}
        brands={brands}
        pages={pages}
        cart={cart}
        items={cartItems}
      />
    </>
  );
}

export default Nav;
