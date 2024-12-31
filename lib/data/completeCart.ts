"use server";

import { medusaClient } from "@/lib/config";
import medusaError from "@/lib/util/medusa-error";
import { getMedusaHeaders } from "@/lib/medusaClient";

export async function completeCart(cartId: string) {
  const headers = getMedusaHeaders(["cart"]);

  return medusaClient.carts
    .complete(cartId, headers)
    .then((res) => res)
    .catch((err) => medusaError(err));
}
