"use server";

import { strapiQuery } from "@/lib/strapi-query";
import { ApiSite } from "@/types";

export async function getCategoryFromDomain(domain: string) {
  const data = await strapiQuery<ApiSite[]>({
    path: "store-tabs",
    options: {
      filters: {
        category: {
          name: {
            $eqi: decodeURIComponent(domain),
          },
        },
      },
    },
  });

  const tab = data?.data?.[0];

  return tab;
}
