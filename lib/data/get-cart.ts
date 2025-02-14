"use server";

import { ApiCart, ApiProductVariant } from "@/types";
import { cookies } from "next/headers";
import { strapiQuery } from "../strapi-query";

export async function getCart() {
  const awaitedCookies = await cookies();
  const cartId = awaitedCookies.get("cartId")?.value;

  if (!cartId) {
    const cart = await strapiQuery<ApiCart>({
      path: "carts",
      fetchOptions: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {},
        }),
      },
    });

    awaitedCookies.set("cartId", cart?.data?.documentId);

    return cart?.data;
  } else {
    const cart = await strapiQuery<ApiCart>({
      path: `carts/${cartId}`,
      options: {
        populate: {
          lineItems: {
            populate: {
              productVariant: true,
            },
          },
        },
      },
    });

    const lineItems = await strapiQuery<ApiProductVariant[]>({
      path: `product-variants`,
      options: {
        filters: {
          documentId: { $in: cart?.data?.lineItems?.map((item) => item.productVariant.documentId) },
        },
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
    });

    if (!cart) {
      awaitedCookies.delete("cartId");
      throw new Error("Cart not found");
    }

    return {
      ...cart?.data,
      lineItems: cart.data.lineItems.map((item) => {
        const variant =
          lineItems.data.find((variant) => variant.documentId === item.productVariant.documentId) ||
          item.productVariant;

        return { ...item, productVariant: variant };
      }),
    };
  }
}
