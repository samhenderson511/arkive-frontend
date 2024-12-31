"use server"

import { deleteShippingAddress } from "../medusaClient"
import { revalidateTag } from "next/cache"

export async function deleteCustomerShippingAddress(addressId: string) {
  try {
    await deleteShippingAddress(addressId).then(() => {
      revalidateTag("customer")
    })
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}
