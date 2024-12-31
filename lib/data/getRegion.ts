"use server"

import { unstable_cache } from "next/cache"
import { getRegions } from "./getRegions"

export async function getRegion(countryCode: string) {
  const getRegionCache = unstable_cache(
    async (countryCode: string) => {
      const region = await getRegions().then((data) =>
        data.find((r) => r.countries.some((c) => c.iso_2 === countryCode))
      )
      return region
    },
    ["getRegion"],
    { revalidate: false, tags: [countryCode] }
  )

  return getRegionCache(countryCode)
}
