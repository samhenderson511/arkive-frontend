"use server";

import { removeItem } from "@/lib/data/removeItem";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deleteLineItem(lineId: string) {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  if (!lineId) {
    return "Missing lineItem ID";
  }

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    await removeItem({ cartId, lineId });
    revalidateTag("cart");
  } catch (e) {
    return "Error deleting line item";
  }
}
