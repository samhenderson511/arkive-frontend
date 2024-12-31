import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const domain = headersList.get("host");
  const host = `https://${domain}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/cart", "/checkout", "/wishlist"],
    },
    host: host,
    sitemap: `${host}sitemap.xml`,
  };
}
