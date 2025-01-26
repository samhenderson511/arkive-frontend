"use client";

import { GBP } from "@/lib/server";
import { ApiCart, ApiOrder } from "@/types";
import React from "react";

type CartTotalsProps = {
  cart?: ApiCart;
  order?: ApiOrder;
};

const CartTotals: React.FC<CartTotalsProps> = ({ cart, order }) => {
  const subtotal =
    cart?.items.reduce(
      (acc, item) =>
        acc + (item.productVariant.price / (1 + item.productVariant.taxRate / 100)) * item.quantity,
      0
    ) || 0;
  const taxTotal =
    cart?.items.reduce(
      (acc, item) =>
        acc + ((item.productVariant.price * item.productVariant.taxRate) / 100) * item.quantity,
      0
    ) || 0;
  const shippingTotal = order?.shippingMethod?.price || 0;
  const total = cart?.items.reduce((acc, item) => acc + item.total * item.quantity, 0) || 0;
  const giftCardTotal = Math.max(order?.giftCard?.value || 0, order?.total || 0);
  const discountTotal = total - subtotal - taxTotal - shippingTotal - giftCardTotal;

  return (
    <div className="text-muted-foreground">
      <div className="flex items-center justify-between mb-2 text-foreground text-medium">
        <span>Subtotal</span>
        <span>{GBP.format(subtotal)}</span>
      </div>
      <div className="flex flex-col gap-y-1">
        {discountTotal && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span>- {GBP.format(discountTotal)}</span>
          </div>
        )}
        {giftCardTotal && (
          <div className="flex items-center justify-between">
            <span>Gift card</span>
            <span>- {GBP.format(giftCardTotal)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span>{GBP.format(shippingTotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxes</span>
          <span>{GBP.format(taxTotal)}</span>
        </div>
      </div>
      <div className="w-full h-px my-4 border-b border-dashed border-border" />
      <div className="flex items-center justify-between font-semibold text-foreground">
        <span>Total</span>
        <span>{GBP.format(total)}</span>
      </div>
    </div>
  );
};

export { CartTotals };
