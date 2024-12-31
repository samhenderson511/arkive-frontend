"use server"

import type { StorePostCustomersCustomerAddressesAddressReq } from "@medusajs/client-types"
import { revalidateTag } from "next/cache"
import { updateShippingAddress } from "../medusaClient"

export async function updateCustomerShippingAddress(
  currentState: { addressId: string; success: boolean; error: string },
  formData: FormData
) {
  const addressId = currentState.addressId as string

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    company: formData.get("company") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
  } as StorePostCustomersCustomerAddressesAddressReq

  try {
    await updateShippingAddress(addressId, address).then(() => {
      revalidateTag("customer")
    })
    return { success: true, error: null, addressId }
  } catch (error: any) {
    return { success: false, error: error.toString(), addressId }
  }
}
