"use server";

import { revalidateTag } from "next/cache";
import { getToken } from "@/lib/data/getToken";

export async function logCustomerIn(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await getToken({ email, password }).then(() => {
      revalidateTag("customer");
    });
  } catch (error: any) {
    return error.toString();
  }
}
