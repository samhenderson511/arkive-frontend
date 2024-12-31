import { Button } from "@/components/common";
import { strapiFetch } from "@/lib/api";
import { barlow } from "app/fonts";
import clsx from "clsx";
import { ReactNode } from "react";
import slugify from "slugify";
import { StoreTab } from "types/strapi";

async function Help({
  title = "Need Help?",
  description = `You can edit your order's items, and shipping address right up until it's been dispatched. If you have any other questions, please contact customer support.`,
}: {
  title?: string;
  description?: ReactNode;
}) {
  const tab: [StoreTab] = await strapiFetch({
    endpoint: "store-tabs",
    params: {
      "fields[0]": "CategoryHandle",
      "pagination[pageSize]": "1",
      sort: "id",
    },
    depth: 0,
    tags: ["banner-hero", "homepage-grid-tile"],
  });

  return (
    <div className="flex flex-col items-center justify-between p-4 sm:flex-row sm:p-8 gap-4">
      <div className="flex flex-col items-center text-center sm:items-start sm:text-start gap-2">
        <h3 className={clsx(barlow.className, "uppercase text-2xl")}>{title}</h3>
        <span className="prose max-w-none grow prose-sm dark:prose-invert">{description}</span>
      </div>
      <Button
        variant={"outline"}
        className={"shrink-0"}
        href={`/${slugify(tab[0].attributes.CategoryHandle, {
          lower: true,
        })}/contact`}
      >
        Contact Us
      </Button>
    </div>
  );
}

export default Help;
