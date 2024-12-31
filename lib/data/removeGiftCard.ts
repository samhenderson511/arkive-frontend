"use server"

import type { GiftCard } from "@medusajs/client-types"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { updateCart } from "./updateCart"

export async function removeGiftCard(
  codeToRemove: string,
  giftCards: GiftCard[]
) {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value

  if (!cartId) return "No cartId cookie found"

  try {
    await updateCart(cartId, {
      gift_cards: [...giftCards]
        .filter((gc) => gc.code !== codeToRemove)
        .map((gc) => ({ code: gc.code })),
    }).then(() => {
      revalidateTag("cart")
    })
  } catch (error: any) {
    throw error
  }
}
