"use client";

import { useCart } from "@/lib/hooks";
import Image from "next/image";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { CartItem } from "./cart-item";
import { CartTotals } from "./cart-totals";
import { DiscountForm } from "./discount-form";

export function CartPage() {
  const { cart } = useCart();

  return (
    <div className="flex justify-center w-full px-4 lg:px-8">
      <div className="max-w-screen-xl flex gap-8 w-full flex-col sm:flex-row relative justify-start">
        <div className="flex flex-col gap-4 grow">
          <Text element="h1" elementStyle="h3" className="mb-4">
            Your Cart
          </Text>

          {!cart?.lineItems?.length ?
            <div className="flex flex-col gap-8 items-center">
              <div className={"grow w-full max-w-sm relative flex items-center"}>
                <Image
                  alt={"Empty cart"}
                  src={"/Void-Illustr.svg"}
                  fill
                  className={"!relative w-full"}
                />
              </div>
              <span>Your cart is is empty.</span>
              <Button size={"lg"} href={"/"}>
                Explore All Products
              </Button>
            </div>
          : cart?.lineItems.map((item) => (
              <CartItem
                key={item.productVariant.documentId}
                variant={item.productVariant}
                quantity={item.quantity}
              />
            ))
          }
        </div>

        <aside className="flex flex-col gap-4 basis-96 sm:shrink-0 sm:border-l sm:pl-8 sticky top-20 h-max">
          <Text element="h2" elementStyle="h3">
            Order Summary
          </Text>

          <CartTotals />

          <hr className="border-border" />

          <Button>Proceed to Checkout</Button>

          <DiscountForm />
        </aside>
      </div>
    </div>
  );
}
