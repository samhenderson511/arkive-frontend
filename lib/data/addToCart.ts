"use server";

import { addItem } from "@/lib/data/addItem";
import { revalidateTag } from "next/cache";
import { getOrSetCart } from "./getOrSetCart";

export async function addToCart({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string;
  quantity: number;
  countryCode: string;
}) {
  const cart = await getOrSetCart(countryCode).then((cart) => cart);

  if (!cart) {
    return "Missing cart ID";
  }

  if (!variantId) {
    return "Missing product variant ID";
  }

  try {
    await addItem({ cartId: cart.id, variantId, quantity });
    revalidateTag("cart");
  } catch (e) {
    return "Error adding item to cart";
  }
}
