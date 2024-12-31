"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { addShippingMethod } from "@/lib/data/addShippingMethod";

export async function setShippingMethod(shippingMethodId: string) {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value;

  if (!cartId) throw new Error("No cartId cookie found");

  try {
    await addShippingMethod({ cartId, shippingMethodId });
    revalidateTag("cart");
  } catch (error: any) {
    throw error;
  }
}
