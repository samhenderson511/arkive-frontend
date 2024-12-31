"use server";

import { medusaClient } from "@/lib/config";
import medusaError from "@/lib/util/medusa-error";
import { getMedusaHeaders } from "@/lib/medusaClient";

export async function setPaymentSession({
  cartId,
  providerId,
}: {
  cartId: string;
  providerId: string;
}) {
  const headers = getMedusaHeaders(["cart"]);

  return medusaClient.carts
    .setPaymentSession(cartId, { provider_id: providerId }, headers)
    .then(({ cart }) => cart)
    .catch((err) => medusaError(err));
}
