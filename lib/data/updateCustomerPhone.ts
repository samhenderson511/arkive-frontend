"use server"

import type { StorePostCustomersCustomerReq } from "@medusajs/client-types"
import { revalidateTag } from "next/cache"
import { updateCustomer } from "../medusaClient"

export async function updateCustomerPhone(
  _currentState: { success: boolean; error: string | null },
  formData: FormData
) {
  const customer = {
    phone: formData.get("phone"),
  } as StorePostCustomersCustomerReq

  try {
    await updateCustomer(customer).then(() => {
      revalidateTag("customer")
    })
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}
