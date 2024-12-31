import { getProductsById } from "@/lib/medusaClient";
import type { LineItem } from "@medusajs/client-types";
import { omit } from "lodash";

export async function enrichLineItems(
  lineItems: LineItem[],
  regionId: string
): Promise<Omit<LineItem, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">[] | undefined> {
  // Prepare query parameters
  const queryParams = {
    ids: lineItems?.map((lineItem) => lineItem.variant.product_id),
    regionId: regionId,
  };

  if (!queryParams.ids?.length) {
    return [];
  }

  // Fetch products by their IDs
  const products = await getProductsById(queryParams);

  // If there are no line items or products, return an empty array
  if (!lineItems?.length || !products) {
    return [];
  }

  // Enrich line items with product and variant information
  const enrichedItems = lineItems.map((item) => {
    const product = products.find((p) => p.id === item.variant.product_id);
    const variant = product?.variants.find((v) => v.id === item.variant_id);

    // If product or variant is not found, return the original item
    if (!product || !variant) {
      return item;
    }

    // If product and variant are found, enrich the item
    return {
      ...item,
      variant: {
        ...variant,
        product: omit(product, "variants"),
      },
    };
  }) as LineItem[];

  return enrichedItems;
}
