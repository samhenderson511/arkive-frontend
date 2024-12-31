"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { deleteDiscount } from "./deleteDiscount"

export async function removeDiscount(code: string) {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value

  if (!cartId) return "No cartId cookie found"

  try {
    await deleteDiscount(cartId, code)
    revalidateTag("cart")
  } catch (error: any) {
    throw error
  }
}
