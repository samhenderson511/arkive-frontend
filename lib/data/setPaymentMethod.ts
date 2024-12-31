"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { setPaymentSession } from "./setPaymentSession"

export async function setPaymentMethod(providerId: string) {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value

  if (!cartId) throw new Error("No cartId cookie found")

  try {
    const cart = await setPaymentSession({ cartId, providerId })
    revalidateTag("cart")
    return cart
  } catch (error: any) {
    throw error
  }
}
