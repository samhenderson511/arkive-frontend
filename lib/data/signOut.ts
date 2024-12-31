"use server"

import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { cookies, headers } from "next/headers"

export async function signOut() {
  (await cookies()).set("_medusa_jwt", "", {
    maxAge: -1,
  })

  revalidateTag("auth")
  revalidateTag("customer")

  redirect(`/account`)
}
