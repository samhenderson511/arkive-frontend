"use client";

import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components";
import { useGlobal } from "@/lib";
import { useCart } from "@/lib/hooks";
import { GBP } from "@/lib/server";
import { getVariantPrice } from "@/lib/util/format-product";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { useMemo } from "react";
import { CartItem } from "./cart-item";

export function CartSheet() {
  const { openCart, setOpenCart } = useGlobal();
  const { cart } = useCart();

  const total =
    useMemo(() => {
      return cart?.lineItems?.reduce((acc, item) => {
        const { salePrice } = getVariantPrice(item.productVariant);
        return acc + salePrice * item.quantity;
      }, 0);
    }, [cart]) || 0;

  if (!cart) return null;

  return (
    <Sheet open={openCart} onOpenChange={setOpenCart}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Basket</SheetTitle>
          <VisuallyHidden>
            <SheetDescription>Your basket</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>

        {!cart?.lineItems?.length ?
          <>
            <div className={"grow w-full relative flex items-center"}>
              <Image
                alt={"Empty cart"}
                src={"/Void-Illustr.svg"}
                fill
                className={"!relative w-full"}
              />
            </div>
            <SheetFooter className={"!flex-col w-full gap-3 items-center"}>
              <span>Your basket is is empty.</span>
              <SheetClose asChild>
                <Button size={"lg"} href={"/"} className={"!w-full"}>
                  Explore All Products
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        : <div className={"flex flex-col flex-1 justify-between"}>
            <div className="flex flex-col overflow-y-scroll gap-2">
              {Boolean(cart.lineItems?.length) &&
                cart.lineItems?.map((item) => (
                  <CartItem
                    key={item.productVariant.documentId}
                    variant={item.productVariant}
                    quantity={item.quantity}
                  />
                ))}
            </div>

            <SheetFooter className="flex !flex-col gap-x-0 gap-y-3">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">
                  Subtotal <span className="font-normal">(incl. taxes)</span>
                </span>
                <span className="text-lg font-bold">{GBP.format(total)}</span>
              </div>

              <Button
                className={"!w-full"}
                size={"default"}
                href={"/checkout"}
                onClick={() => setOpenCart(false)}
              >
                Checkout Securely
              </Button>
              <Button
                variant={"outline"}
                className={"!w-full"}
                size={"default"}
                href={"/cart"}
                onClick={() => setOpenCart(false)}
              >
                Go to Basket
              </Button>
              <Button
                variant={"outline"}
                className={"!w-full"}
                size={"default"}
                onClick={() => setOpenCart(false)}
              >
                Continue Shopping
              </Button>
            </SheetFooter>
          </div>
        }
      </SheetContent>
    </Sheet>
  );
}
