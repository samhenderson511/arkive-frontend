"use server"

import { cookies } from "next/headers"

export async function handleHide() {
  (await cookies()).set("announcement-banner", "true", {
    maxAge: 60 * 60 * 24 * 14,
  })
  // window.location.reload()
}
