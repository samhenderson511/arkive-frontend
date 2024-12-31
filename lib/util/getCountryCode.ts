import { DEFAULT_REGION } from "@/lib/constants";
import type { Region } from "@medusajs/client-types";
import { NextRequest } from "next/server";

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
export async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, Region | number>
) {
  try {
    let countryCode;

    const vercelCountryCode = request.headers.get("x-vercel-ip-country")?.toLowerCase();

    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase();

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode;
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode;
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION;
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value;
    }

    return countryCode;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a NEXT_PUBLIC_MEDUSA_BACKEND_URL environment variable?"
      );
    }
  }
}
