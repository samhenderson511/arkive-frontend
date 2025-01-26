"use server";

import { ApiCart } from "@/types";
import { cookies } from "next/headers";
import { strapiQuery } from "../strapi-query";

export async function getCart() {
  const awaitedCookies = await cookies();
  const cartId = awaitedCookies.get("cartId")?.value;

  if (!cartId) {
    throw new Error("Cart not found");
  }

  return strapiQuery<ApiCart>({
    path: `carts/${cartId}`,
    options: { populate: { items: { populate: { productVariant: true } } } },
  }).then((cart) => {
    return cart.data;
  });
}
