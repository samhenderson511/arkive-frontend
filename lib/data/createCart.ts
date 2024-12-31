"use server";

import { medusaClient } from "@/lib/config";
import { getMedusaHeaders } from "@/lib/medusaClient";

export async function createCart(data = {}) {
  const headers = getMedusaHeaders(["cart"]);

  return medusaClient.carts
    .create(data, headers)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
}
