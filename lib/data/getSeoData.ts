"use server";

import "server-only";

import { ApiSeo } from "@/types";
import { strapiQuery } from "../strapi-query";

export async function getSeoData(route: string) {
  const data = await strapiQuery<ApiSeo[]>({
    path: "seos",
    options: {
      filters: {
        Route: {
          $eq: route,
        },
      },
    },
  });

  return data?.data?.[0];
}
