"use server";

import { medusaClient } from "@/lib/config";
import medusaError from "@/lib/util/medusa-error";
import { getMedusaHeaders } from "@/lib/medusaClient";

export async function addShippingMethod({
  cartId,
  shippingMethodId,
}: {
  cartId: string;
  shippingMethodId: string;
}) {
  const headers = getMedusaHeaders(["cart"]);

  return medusaClient.carts
    .addShippingMethod(cartId, { option_id: shippingMethodId }, headers)
    .then(({ cart }) => cart)
    .catch((err) => medusaError(err));
}
