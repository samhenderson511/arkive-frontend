"use server";

import { medusaClient } from "@/lib/config";
import { StorePostCartsCartReq } from "@medusajs/client-types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { getMedusaHeaders } from "@/lib/medusaClient";
import { updateCart } from "./updateCart";

export async function deleteDiscount(cartId: string, code: string) {
  const headers = getMedusaHeaders(["cart"]);

  return medusaClient.carts
    .deleteDiscount(cartId, code, headers)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export async function cartUpdate(data: StorePostCartsCartReq) {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value;

  if (!cartId) return "No cartId cookie found";

  try {
    await updateCart(cartId, data);
    revalidateTag("cart");
  } catch (error: any) {
    return error.toString();
  }
}

export async function applyDiscount(code: string) {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value;

  if (!cartId) return "No cartId cookie found";

  try {
    await updateCart(cartId, { discounts: [{ code }] }).then(() => {
      revalidateTag("cart");
    });
  } catch (error: any) {
    throw error;
  }
}
