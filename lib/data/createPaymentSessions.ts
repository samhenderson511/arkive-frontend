import { medusaClient } from "@/lib/config";
import { getMedusaHeaders } from "@/lib/medusaClient";

export async function createPaymentSessions(cartId: string) {
  const headers = getMedusaHeaders(["cart"]);

  return medusaClient.carts
    .createPaymentSessions(cartId, headers)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
}
