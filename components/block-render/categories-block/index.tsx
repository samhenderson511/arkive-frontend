import { strapiQuery } from "@/lib/strapi-query";
import { transformAsset } from "@/lib/util/transform-asset";
import { ApiCategory, UiCategories } from "@/types";
import { CategoriesClient } from "./client";

export async function CategoriesBlock({
  categories,
  className,
}: UiCategories & { className?: string }) {
  const { data: populatedCategories } = await strapiQuery<ApiCategory[]>({
    path: "categories",
    options: {
      filters: {
        documentId: {
          $in: categories.map((category) => category.documentId),
        },
      },
      populate: {
        banner: {
          populate: "*",
        },
      },
    },
  });

  return (
    <CategoriesClient
      categories={await Promise.all(
        populatedCategories.map(async ({ name, banner }) => ({
          background: await transformAsset(banner?.background),
          name,
        }))
      )}
      className={className}
    />
  );
}
