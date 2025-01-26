import { ProductSearchResult } from "@/types";

export const constructSlug = (hit: ProductSearchResult) => {
  return [...(hit.categories?.subDept?.split(" > ").slice(1) || []), encodeURIComponent(hit.name)]
    .filter(Boolean)
    .join("/")
    .toLowerCase();
};
