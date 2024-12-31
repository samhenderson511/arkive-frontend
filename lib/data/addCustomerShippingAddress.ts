"use server"

import type { StorePostCustomersCustomerAddressesReq } from "@medusajs/client-types"
import { revalidateTag } from "next/cache"
import { addShippingAddress } from "../medusaClient"

export async function addCustomerShippingAddress(
  _currentState: { success: boolean; error: string | null },
  formData: FormData
) {
  const customer = {
    address: {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      company: formData.get("company") as string,
      address_1: formData.get("address_1") as string,
      address_2: formData.get("address_2") as string,
      city: formData.get("city") as string,
      postal_code: formData.get("postal_code") as string,
      province: formData.get("province") as string,
      country_code: formData.get("country_code") as string,
      phone: formData.get("phone") as string,
    },
  } as StorePostCustomersCustomerAddressesReq

  try {
    await addShippingAddress(customer).then(() => {
      revalidateTag("customer")
    })
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}
