"use server";

import { ApiCart } from "@/types";
import { revalidateTag } from "next/cache";
import { strapiQuery } from "../strapi-query";
import { getCart } from "./get-cart";

export async function updateCart({ variantId, quantity }: { variantId: string; quantity: number }) {
  const cart = await getCart();

  if (!cart) {
    return "Missing cart ID";
  }

  if (!variantId) {
    return "Missing product variant ID";
  }

  try {
    await strapiQuery({
      path: `carts/${cart.documentId}`,
      options: { populate: { lineItems: { populate: { productVariant: true } } } },
      tags: [`carts/${cart.documentId}`],
      fetchOptions: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            lineItems: [
              ...cart.lineItems.filter((item) => item.productVariant?.documentId !== variantId),
              {
                productVariant: variantId,
                quantity:
                  (cart.lineItems.find((item) => item.productVariant?.documentId === variantId)
                    ?.quantity || 0) + quantity,
              },
            ],
          } as ApiCart,
        }),
      },
    });
    revalidateTag(`carts/${cart.documentId}`);
  } catch (e) {
    return "Error adding item to cart";
  }
}
