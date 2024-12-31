"use server";

import { medusaClient } from "@/lib/config";
import medusaError from "@/lib/util/medusa-error";
import { getMedusaHeaders } from "@/lib/medusaClient";

export async function updateItem({
  cartId,
  lineId,
  quantity,
}: {
  cartId: string;
  lineId: string;
  quantity: number;
}) {
  const headers = getMedusaHeaders(["cart"]);

  return medusaClient.carts.lineItems
    .update(cartId, lineId, { quantity }, headers)
    .then(({ cart }) => cart)
    .catch((err) => medusaError(err));
}
