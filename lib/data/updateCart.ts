"use server";

import { medusaClient } from "@/lib/config";
import { getMedusaHeaders } from "@/lib/medusaClient";
import medusaError from "@/lib/util/medusa-error";
import type { StorePostCartsCartReq } from "@medusajs/client-types";

export async function updateCart(cartId: string, data: StorePostCartsCartReq) {
  const headers = getMedusaHeaders(["cart"]);

  return medusaClient.carts
    .update(cartId, data, headers)
    .then(({ cart }) => cart)
    .catch((error) => medusaError(error));
}
