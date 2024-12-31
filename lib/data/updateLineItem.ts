"use server";

import { updateItem } from "@/lib/data/updateItem";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function updateLineItem({ lineId, quantity }: { lineId: string; quantity: number }) {
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
    await updateItem({ cartId, lineId, quantity });
    revalidateTag("cart");
  } catch (e: any) {
    return e.toString();
  }
}
