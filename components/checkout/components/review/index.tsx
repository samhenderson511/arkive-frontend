"use client"

import type { Cart } from "@medusajs/client-types"
import { useSearchParams } from "next/navigation"
import PaymentButton from "../payment-button"
import clsx from "clsx"
import Link from "next/link"
import { barlow } from "app/fonts"

const Review = ({
  cart,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    cart.payment_session

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h2
          className={clsx(
            "flex text-3xl gap-x-2 uppercase items-center",
            barlow.className,
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Review
        </h2>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start w-full mb-6 gap-x-1">
            <div className="w-full">
              <p className="mb-1">
                By placing your order, you agree to our{" "}
                <Link
                  className={"font-medium hover:underline"}
                  href={"/support"}
                >
                  store policies
                </Link>
                .
              </p>
            </div>
          </div>
          <PaymentButton cart={cart} />
        </>
      )}
    </div>
  )
}

export default Review
