"use server";

import { medusaClient } from "@/lib/config";
import { getMedusaHeaders } from "@/lib/medusaClient";

export async function removeItem({ cartId, lineId }: { cartId: string; lineId: string }) {
  const headers = getMedusaHeaders(["cart"]);

  return medusaClient.carts.lineItems
    .delete(cartId, lineId, headers)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
}
