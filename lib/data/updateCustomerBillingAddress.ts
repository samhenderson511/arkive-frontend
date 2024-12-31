"use server"

import type { StorePostCustomersCustomerReq } from "@medusajs/client-types"
import { revalidateTag } from "next/cache"
import { updateCustomer } from "../medusaClient"

export async function updateCustomerBillingAddress(
  _currentState: { success: boolean; error: string | null },
  formData: FormData
) {
  const customer = {
    billing_address: {
      first_name: formData.get("billing_address.first_name"),
      last_name: formData.get("billing_address.last_name"),
      company: formData.get("billing_address.company"),
      address_1: formData.get("billing_address.address_1"),
      address_2: formData.get("billing_address.address_2"),
      city: formData.get("billing_address.city"),
      postal_code: formData.get("billing_address.postal_code"),
      province: formData.get("billing_address.province"),
      country_code: formData.get("billing_address.country_code"),
      phone: formData.get("billing_address.phone"),
    },
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
