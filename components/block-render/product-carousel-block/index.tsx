import { strapiQuery } from "@/lib/strapi-query";
import { ApiProduct, ApiSite, UiProductCarousel } from "@/types";
import clsx from "clsx";
import { Text } from "../../ui/text";
import { ButtonBlock } from "../button-block";
import { ProductCarouselBlockClient } from "./product-carousel-block-client";

export async function ProductCarouselBlock({
  title,
  rows = 2,
  brands,
  categories,
  button,
  limit,
  onSaleOnly,
  className,
  site,
  ignoredProducts,
}: UiProductCarousel & { className?: string; site: ApiSite; ignoredProducts?: ApiProduct[] }) {
  const { data: products } = await strapiQuery<ApiProduct[]>({
    path: "products",
    options: {
      populate: {
        fields: ["name"],
        images: {
          populate: {
            colours: { fields: ["name"], populate: { colourGroup: { fields: ["name"] } } },
            thumbnail: true,
          },
        },
        applicableSales: { fields: ["name", "discountPercentage"] },
        brand: { fields: ["name"] },
        season: { fields: ["name"] },
        categories: {
          populate: {
            children: {
              fields: ["name"],
            },
            parent: {
              fields: ["name"],
            },
          },
        },
        variants: {
          fields: ["price", "size", "stock"],
          populate: {
            colour: {
              fields: ["name"],
              populate: { colourGroup: { fields: ["name"] } },
            },
          },
        },
      },
      filters: {
        ...(brands && { brand: { documentId: { $in: brands.map((brand) => brand.documentId) } } }),
        ...(onSaleOnly && { applicableSales: { $null: false } }),
        ...(ignoredProducts && {
          documentId: { $not: { $in: ignoredProducts.map((product) => product.documentId) } },
        }),
        categories: {
          documentId: {
            $in: [site.category.documentId, ...categories?.map((category) => category.documentId)],
          },
        },
        variants: {
          stock: {
            $gt: 0,
          },
        },
      },
      pagination: { page: 1, pageSize: limit ?? 18 },
    },
  });

  if (!products?.length) {
    return null;
  }

  return (
    <div className={clsx("flex flex-col items-center w-full gap-6 p-1.5 px-4 lg:px-8", className)}>
      <div className="max-w-screen-2xl w-full xl:bg-background flex flex-col gap-8">
        <div className="flex flex-col gap-2 sm:flex-row  justify-between items-baseline">
          <Text element="h2" elementStyle="h3">
            {title}
          </Text>

          {button && <ButtonBlock {...button} size="Large" />}
        </div>
      </div>

      <ProductCarouselBlockClient products={products} rows={rows} />
    </div>
  );
}
