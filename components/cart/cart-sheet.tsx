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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

export function CartSheet() {
  const { openCart, setOpenCart, cart } = useGlobal();

  return (
    <Sheet open={openCart} onOpenChange={setOpenCart}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Basket</SheetTitle>
          <VisuallyHidden>
            <SheetDescription>Your basket</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>

        {!cart?.items?.length ?
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
              {Boolean(cart.items?.length) && cart.items?.map((item) => item.productVariant.name)}
            </div>
            <SheetFooter className="flex !flex-col gap-x-0 gap-y-3">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">
                  Subtotal <span className="font-normal">(incl. taxes)</span>
                </span>
                <span className="text-lg font-bold">
                  {cart.items?.reduce((acc, item) => acc + item.total, 0)}
                </span>
              </div>
              <SheetClose asChild>
                <Button className={"!w-full"} size={"lg"} href={"/checkout?step=address"}>
                  Checkout Securely
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant={"outline"} className={"!w-full"} size={"lg"} href={"/cart"}>
                  Go to Basket
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant={"outline"} className={"!w-full"} size={"lg"}>
                  Continue Shopping
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        }
      </SheetContent>
    </Sheet>
  );
}
