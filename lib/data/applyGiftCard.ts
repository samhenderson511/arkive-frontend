"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { updateCart } from "./updateCart"

export async function applyGiftCard(code: string) {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value

  if (!cartId) return "No cartId cookie found"

  try {
    await updateCart(cartId, { gift_cards: [{ code }] }).then(() => {
      revalidateTag("cart")
    })
  } catch (error: any) {
    throw error
  }
}
