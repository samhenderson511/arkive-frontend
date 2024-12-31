import type { Order } from "@medusajs/client-types";
import { formatAmount } from "@/lib/util";

type OrderSummaryProps = {
  order: Order;
};

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return;
    }

    return formatAmount({ amount, region: order.region, includeTaxes: false });
  };

  return (
    <div>
      <h2 className="text-base-semi">Order Summary</h2>
      <div className="my-2 text-gray-700 text-small-regular">
        <div className="flex items-center justify-between mb-2 text-gray-900 text-base-regular">
          <span>Subtotal</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {order.discount_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(order.discount_total)}</span>
            </div>
          )}
          {order.gift_card_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(order.gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>{getAmount(order.shipping_total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Taxes</span>
            <span>{getAmount(order.tax_total)}</span>
          </div>
        </div>
        <div className="w-full h-px my-4 border-b border-gray-200 border-dashed" />
        <div className="flex items-center justify-between mb-2 text-gray-900 text-base-regular">
          <span>Total</span>
          <span>{getAmount(order.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
