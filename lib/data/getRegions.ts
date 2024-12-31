"use server";

import { medusaClient } from "@/lib/config";
import type { Region } from "@medusajs/client-types";
import { unstable_cache } from "next/cache";

export const getRegions = unstable_cache(
  async () => {
    const regions = await medusaClient.regions.list();
    return regions?.regions as unknown as Region[];
  },
  ["getRegions"],
  { revalidate: false, tags: ["regions"] }
);
