import { SocialIcons } from "@/components";
import { strapiQuery, toTitleCase } from "@/lib/server";
import { ApiSharedPage, ApiSite } from "@/types";
import Image from "next/image";
import slugify from "slugify";
import { Column } from "./column";
import { Copyright } from "./copyright";
import { SiteInfo } from "./site-info";

export async function Footer({ site }: { site: ApiSite }) {
  const pages = await strapiQuery<ApiSharedPage[]>({ path: "shared-pages" });

  const columns = [
    [
      ["Sale", "New Arrivals", "Brands"].map((item) => ({
        href: slugify(item, { lower: true }),
        label: item,
      })),
      site.category?.children?.map((c) => ({
        href: slugify(c.name, { lower: true }),
        label: toTitleCase(c.name),
      })),
    ],
    [
      ["Contact Us"].map((item) => ({
        href: slugify(item, { lower: true }),
        label: item,
      })),
      pages?.data.map((p) => ({ href: `support/${p.slug}`, label: p.name })),
    ],
    [
      ["Account", "Addresses", "Orders", "Profile", "Cart"].map((item) => ({
        href: slugify(item, { lower: true }),
        label: item,
      })),
    ],
  ];

  return (
    // add padding bottom to the footer to make space for the mobile navigation
    <footer className="p-4 lg:px-8 gap-8 flex w-full bg-muted/50 pb-24 lg:pb-4 pt-16 items-center flex-col">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-2xl">
        <SiteInfo site={site} />

        <Column title="Explore" items={columns[0]} />

        <Column title="Customer Service" items={columns[1]} />

        <Column title="My Arkive" items={columns[2]} />
      </div>

      <div className="flex items-center flex-col sm:flex-row w-full gap-8 justify-between max-w-screen-2xl">
        <SocialIcons
          links={{
            facebook: site.facebook,
            instagram: site.instagram,
            twitter: site.twitter,
            emailAddress: site.email,
            phoneNumber: site.phone,
          }}
        />

        <div className={"!relative flex h-8"}>
          <Image
            src={"/payment-providers.svg"}
            className={"!relative flex"}
            fill
            alt={"Payment Providers"}
          />
        </div>
      </div>

      <Copyright />
    </footer>
  );
}
