import { UiCategories } from "@/types";
import { CategoriesClient } from "./client";
import { transformAsset } from "@/lib/util/blurhash";

export async function CategoriesBlock({ categories }: UiCategories) {
  return (
    <CategoriesClient
      categories={await Promise.all(
        categories.map(async ({ name, banner }) => ({
          background: await transformAsset(banner.background),
          name,
        }))
      )}
    />
  );
}
