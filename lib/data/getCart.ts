import { medusaClient } from "@/lib/config";
import { cache } from "react";
import { getMedusaHeaders } from "@/lib/medusaClient";

export const getCart = cache(async function (cartId: string) {
  const headers = getMedusaHeaders(["cart"]);

  return medusaClient.carts
    .retrieve(cartId, headers)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
});
