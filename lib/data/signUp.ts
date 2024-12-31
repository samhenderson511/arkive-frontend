"use server";

import type { StorePostCustomersReq } from "@medusajs/client-types";
import { revalidateTag } from "next/cache";
import { getToken } from "@/lib/data/getToken";
import { createCustomer } from "../medusaClient";

export async function signUp(_currentState: unknown, formData: FormData) {
  const customer = {
    email: formData.get("email"),
    password: formData.get("password"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    phone: formData.get("phone"),
  } as StorePostCustomersReq;

  try {
    await createCustomer(customer);
    await getToken({ email: customer.email, password: customer.password }).then(() => {
      revalidateTag("customer");
    });
  } catch (error: any) {
    return error.toString();
  }
}
