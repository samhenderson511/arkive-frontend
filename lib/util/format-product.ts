import { ApiCategory, ApiProduct, ProductSearchResult } from "@/types";

export function formatProduct(product: ApiProduct): ProductSearchResult {
  // Function to construct the slug
  const constructHierarchy = (category: ApiCategory) => {
    const categoryPath = [];
    let currentCategory: ApiCategory | undefined = category;

    while (currentCategory) {
      if (currentCategory) {
        categoryPath.push(currentCategory.name);
      }

      currentCategory = product.categories?.find(
        (cat) => cat.parent?.documentId === currentCategory?.documentId
      );
    }

    const categories = {
      cat: categoryPath[0],
      dept: categoryPath.slice(0, 2).join(" > "),
      subDept: categoryPath.join(" > "),
    };

    return categories;
  };

  const highestDiscount = Math.max(
    ...product.applicableSales?.map((sale) => sale.discountPercentage),
    0
  );

  const minPrice = Math.min(...(product.variants?.map((variant) => variant?.price) || [0]));

  const inStockVariants = product.variants?.filter((variant) => Boolean(variant?.stock));
  const inStockColourGroups = inStockVariants?.flatMap((variant) =>
    variant.colour?.map((c) => c.colourGroup?.name).filter(Boolean)
  );

  const inStockImages = product.images?.filter((image) =>
    inStockVariants?.some((variant) =>
      variant.colour?.every((variantColour) => image.name.includes(variantColour.name))
    )
  );

  // Find the root category (without a parent)
  const rootCategory = product.categories?.find((cat) => !cat.parent);

  const document = {
    id: product.documentId,
    name: product.name,
    categories: rootCategory ? constructHierarchy(rootCategory) : {},
    createdAt: new Date(product.createdAt).getTime(),
    colourGroups: Array.from(new Set(inStockColourGroups)) || [],
    images: inStockImages?.map((image) => ({
      name: image.name || "",
      colours: image.colours?.map((c) => c.name) || [],
      colourGroups: image.colours?.map((c) => c.colourGroup?.name) || [],
      ...(image.thumbnail?.url ? { url: image.thumbnail?.url } : {}),
      ...(image.thumbnail?.blurhash ? { blurhash: image.thumbnail?.blurhash } : {}),
      ...(image.thumbnail?.width ? { width: image.thumbnail?.width } : {}),
      ...(image.thumbnail?.height ? { height: image.thumbnail?.height } : {}),
    })),
    brand: product.brand?.name,
    sizes: Array.from(new Set(inStockVariants?.map((variant) => variant?.size) || [])),
    price: parseFloat(minPrice.toFixed(2)),
    discount: highestDiscount,
  };

  return document;
}
