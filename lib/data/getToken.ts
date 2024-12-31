"use server";

import { medusaClient } from "@/lib/config";
import type { StorePostAuthReq } from "@medusajs/client-types";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

export async function getToken(credentials: StorePostAuthReq) {
  return medusaClient.auth
    .getToken(credentials, {
      next: {
        tags: ["auth"],
      },
    })
    .then(({ access_token }) => {
      access_token &&
        (cookies() as unknown as UnsafeUnwrappedCookies).set("_medusa_jwt", access_token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });
      return access_token;
    })
    .catch((err) => {
      throw new Error("Wrong email or password.");
    });
}
