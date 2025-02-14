import { strapiQuery } from "@/lib/strapi-query";
import { ApiBrand, ApiSite, UiBrands } from "@/types";
import { BrandsClient } from "./client";

export async function BrandsBlock({
  scrollSpeed,
  className,
  site,
}: UiBrands & { className?: string; site: ApiSite }) {
  const brands = await strapiQuery<ApiBrand[]>({
    path: "brands",
    options: {
      populate: ["logo"],
      filters: {
        products: {
          categories: {
            documentId: {
              $in: site.category.documentId,
            },
          },
          variants: {
            stock: {
              $gt: 0,
            },
          },
        },
      },
    },
  }).then(
    async (res) =>
      await Promise.all(
        res.data?.map(async (brand) => ({
          name: brand.name,
          logo: {
            src: brand.logo.url,
            alt: brand.name,
            width: brand.logo.width,
            height: brand.logo.height,
          },
        }))
      )
  );

  return <BrandsClient scrollSpeed={scrollSpeed} brands={brands} className={className} />;
}
