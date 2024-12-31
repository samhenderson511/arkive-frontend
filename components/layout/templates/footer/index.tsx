import { strapiFetch } from "@/lib/api";
import { notFound } from "next/navigation";
import type { FooterUsp, RichTextPage, StoreTab } from "types/strapi";
import { Column1, Column2, Column3, SiteInfo } from "./Columns";
import { Copyright } from "./Copyright";
import { USPs } from "./USPs";

export interface FooterProps {
  tabs: StoreTab[];
  pages: RichTextPage[];
  storeTab: string;
}

export async function Footer({ tabs, pages, storeTab }: FooterProps) {
  const faqs = await strapiFetch({ endpoint: "faqs", depth: 0 });
  const usps: FooterUsp[] = await strapiFetch({ endpoint: "footer-usps" });

  const currentYear = new Date().getFullYear();
  const currentTab = tabs.find((tab) => tab.attributes.CategoryHandle === storeTab);

  if (!currentTab) {
    return notFound();
  }

  return (
    <footer className={"p-4 md:p-8 gap-4 mb-16 lg:mb-0 md:gap-8 flex w-full items-center flex-col"}>
      <USPs usps={usps} />
      <div className="flex flex-col items-center w-full px-4 py-16 border rounded-sm gap-12 md:px-8 border-border">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-8xl">
          <SiteInfo currentTab={currentTab} />
          <Column1 tabs={tabs} currentHandle={storeTab} currentTab={currentTab} />
          <Column2 pages={pages} currentHandle={storeTab} faqs={faqs} />
          <Column3 />
        </div>
      </div>
      <Copyright currentYear={currentYear} currentTab={currentTab} />
    </footer>
  );
}

export default Footer;
