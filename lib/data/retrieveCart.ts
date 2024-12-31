"use server";

import { getCart } from "@/lib/medusaClient/getCart";
import { cookies } from "next/headers";

export async function retrieveCart() {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value;

  if (!cartId) {
    return null;
  }

  try {
    const cart = await getCart(cartId).then((cart) => cart);
    return cart;
  } catch (e) {
    console.log(e);
    return null;
  }
}
