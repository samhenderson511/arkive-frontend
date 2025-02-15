"use server";

import { ApiCart } from "@/types";
import { revalidateTag } from "next/cache";
import { strapiQuery } from "../strapi-query";
import { getCart } from "./get-cart";

export async function updateCart({
  variantId,
  quantity,
  discountCode,
  giftCard,
  shippingMethod,
}: {
  variantId: string;
  quantity: number;
  discountCode?: string;
  giftCard?: string;
  shippingMethod?: string;
}) {
  const cart = await getCart();

  if (!cart) {
    throw new Error("Missing cart ID");
  }

  if (!variantId) {
    throw new Error("Missing product variant ID");
  }

  const body = JSON.stringify({
    data: {
      lineItems: [
        ...cart.lineItems
          .filter((item) => item.productVariant?.documentId !== variantId)
          .map((item) => ({
            productVariant: item.productVariant.documentId,
            quantity: item.quantity,
          })),
        quantity > 0 && {
          productVariant: variantId,
          quantity,
        },
      ].filter(Boolean),
      ...(discountCode !== undefined && { discountCode }),
      ...(giftCard !== undefined && { giftCard }),
      ...(shippingMethod !== undefined && { shippingMethod }),
    },
  });

  try {
    const result = await strapiQuery<ApiCart>({
      path: `carts/${cart.documentId}`,
      options: {
        populate: {
          discountCode: true,
          giftCard: true,
          shippingMethod: true,
          lineItems: {
            populate: {
              productVariant: {
                populate: {
                  colour: true,
                  product: {
                    populate: {
                      brand: {
                        fields: ["name"],
                      },
                      applicableSales: true,
                      categories: {
                        populate: { parent: true },
                      },
                      images: {
                        populate: {
                          thumbnail: true,
                          colours: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      tags: [`carts/${cart.documentId}`],
      fetchOptions: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
    });

    revalidateTag(`carts/${cart.documentId}`);
    return result.data;
  } catch (error) {
    console.error(error, body);
    throw new Error("Error adding item to cart", { cause: error });
  }
}
