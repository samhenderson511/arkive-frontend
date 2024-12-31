"use client";

import { formatAmount } from "@/lib/util/prices";
import type { Cart, Order } from "@medusajs/client-types";
import React from "react";

type CartTotalsProps = {
  cart?: Omit<Cart, "refundable_amount" | "refunded_total">;
  order?: Order;
};

const CartTotals: React.FC<CartTotalsProps> = ({ cart, order }) => {
  const { subtotal, discount_total, gift_card_total, tax_total, shipping_total, total } =
    cart || order;

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart?.region || order?.region,
      includeTaxes: false,
    });
  };

  return (
    <div className="text-muted-foreground">
      <div className="flex items-center justify-between mb-2 text-foreground text-medium">
        <span>Subtotal</span>
        <span>{getAmount(subtotal)}</span>
      </div>
      <div className="flex flex-col gap-y-1">
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span>- {getAmount(discount_total)}</span>
          </div>
        )}
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Gift card</span>
            <span>- {getAmount(gift_card_total)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span>{getAmount(shipping_total)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxes</span>
          <span>{getAmount(tax_total)}</span>
        </div>
      </div>
      <div className="w-full h-px my-4 border-b border-dashed border-border" />
      <div className="flex items-center justify-between font-semibold text-foreground">
        <span>Total</span>
        <span>{getAmount(total)}</span>
      </div>
    </div>
  );
};

export { CartTotals };
