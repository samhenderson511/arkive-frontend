"use server";
import { getRegion } from "@/lib/data";
import { getCart } from "@/lib/medusaClient/getCart";
import { createCart } from "@/lib/data/createCart";
import { updateCart } from "@/lib/data/updateCart";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

/**
 * Retrieves the cart based on the cartId cookie
 *
 * @returns {Promise<Cart>} The cart
 * @example
 * const cart = await getOrSetCart()
 */

export async function getOrSetCart(countryCode: string) {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId).then((cart) => cart);
  }

  const region = await getRegion(countryCode);

  if (!region) {
    return null;
  }

  const region_id = region.id;

  if (!cart) {
    cart = await createCart({ region_id }).then((res) => res);
    cart &&
      (await cookies()).set("_medusa_cart_id", cart.id, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
    revalidateTag("cart");
  }

  if (cart && cart?.region_id !== region_id) {
    await updateCart(cart.id, { region_id });
    revalidateTag("cart");
  }

  return cart;
}
