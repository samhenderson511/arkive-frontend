"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { completeCart } from "./completeCart"

export async function placeOrder() {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value

  if (!cartId) throw new Error("No cartId cookie found")

  let cart

  try {
    cart = await completeCart(cartId)
    revalidateTag("cart")
  } catch (error: any) {
    throw error
  }

  if (cart?.type === "order") {
    const countryCode = cart.data.shipping_address?.country_code?.toLowerCase()
    (await cookies()).set("_medusa_cart_id", "", { maxAge: -1 })
    redirect(`/${countryCode}/order/confirmed/${cart?.data.id}`)
  }

  return cart
}
