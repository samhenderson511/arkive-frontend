import type { Cart } from "@medusajs/client-types"
import { Button, CartTotals } from "../common"

type SummaryProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const Summary = ({ cart }: SummaryProps) => {
  return (
    <div className="p-6 border rounded-sm grid border-border bg-background grid-cols-1 gap-y-6">
      <CartTotals cart={cart} />
      <Button className={"!w-full"} size={"lg"} href="/checkout?step=address">
        Go to checkout
      </Button>
    </div>
  )
}

export default Summary
