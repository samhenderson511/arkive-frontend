import { medusaFetch } from "@/lib/api";
import type { Region } from "@medusajs/client-types";
import { notFound } from "next/navigation";

const regionMapCache = {
  regionMap: new Map<string, Region>(),
  regionMapUpdated: Date.now(),
};
export async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache;

  if (!regionMap.keys().next().value || regionMapUpdated < Date.now() - 3600 * 1000) {
    // Fetch regions from Medusa. We can't use the JS client here because middleware is running on Edge and the client needs a Node environment.
    const { regions } = await medusaFetch({
      endpoint: "regions",
      tags: ["regions"],
    });

    if (!regions) {
      notFound();
    }

    // Create a map of country codes to regions.
    regions.forEach((region: Region) => {
      region.countries.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2, region);
      });
    });

    regionMapCache.regionMapUpdated = Date.now();
  }

  return regionMapCache.regionMap;
}
