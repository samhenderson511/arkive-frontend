"use server"

import type { Customer } from "@medusajs/client-types"
import { revalidateTag } from "next/cache"
import { authenticate, updateCustomer } from "../medusaClient"

export async function updateCustomerPassword(
  currentState: {
    customer: Omit<Customer, "password_hash">
    success: boolean
    error: string | null
  },
  formData: FormData
) {
  const email = currentState.customer.email as string
  const new_password = formData.get("new_password") as string
  const old_password = formData.get("old_password") as string
  const confirm_password = formData.get("confirm_password") as string

  const isValid = await authenticate({ email, password: old_password })
    .then(() => true)
    .catch(() => false)

  if (!isValid) {
    return {
      customer: currentState.customer,
      success: false,
      error: "Old password is incorrect",
    }
  }

  if (new_password !== confirm_password) {
    return {
      customer: currentState.customer,
      success: false,
      error: "Passwords do not match",
    }
  }

  try {
    await updateCustomer({ password: new_password }).then(() => {
      revalidateTag("customer")
    })

    return {
      customer: currentState.customer,
      success: true,
      error: null,
    }
  } catch (error: any) {
    return {
      customer: currentState.customer,
      success: false,
      error: error.toString(),
    }
  }
}
