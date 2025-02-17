"use server";

import { ApiCart } from "@/types";
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
    });

    if (!cart) {
      awaitedCookies.delete("cartId");
      throw new Error("Cart not found");
    }

    return cart.data;
  }
}
