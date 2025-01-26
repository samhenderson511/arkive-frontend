import { getSite } from "@/lib/data/get-site";
import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  const site = await getSite(host);

  if (!site) return {};

  const { favicon, appleTouchIcon, seo } = site;

  return {
    name: seo?.title,
    short_name: seo?.title,
    description: seo?.description,
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: favicon?.url,
      },
      {
        src: appleTouchIcon?.url,
      },
    ],
  };
}
