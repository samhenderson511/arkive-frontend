import Item from "@/components/cart/components/item";
import { Button, CartTotals } from "@/components/common";
import { Alert, AlertDescription, AlertTitle } from "@/components/common/alert";
import { Badge } from "@/components/common/badge";
import Help from "@/components/order/components/help";
import OrderDetails from "@/components/order/components/order-details";
import ShippingDetails from "@/components/order/components/shipping-details";
import { getCustomer } from "@/lib/medusaClient";
import { getOrderStatus } from "@/lib/util/getOrderStatus";
import type { Order } from "@medusajs/client-types";
import { IconExternalLink } from "@tabler/icons-react";
import React from "react";

type OrderCompletedTemplateProps = {
  order: Order;
};

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = async ({ order }) => {
  const status = getOrderStatus(order);
  const customer = await getCustomer();

  return (
    <div className="flex justify-center bg-card lg:p-8 lg:py-12">
      <div className="flex flex-col w-full max-w-4xl divide-y lg:border border-border divide-border lg:rounded-sm bg-background">
        <OrderDetails order={order} />
        <div className={"flex flex-col gap-3 p-4 sm:p-8"}>
          {order.items.map((item) => (
            <Item canDelete={false} key={item.id} item={item} region={order.region} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 sm:p-8 md:grid-cols-2">
          <ShippingDetails
            shippingMethods={order.shipping_methods}
            shippingAddress={order.shipping_address}
            billingAddress={order.billing_address}
            customer={customer}
          />
          <div className={"flex flex-col gap-y-4"}>
            <div className={"flex flex-col gap-y-3"}>
              <h3 className={"text-sm font-semibold"}>Order Summary</h3>
              <CartTotals order={order} />
            </div>
            <hr className={"border-border"} />
            <div className={"flex justify-between items-baseline"}>
              <h3 className={"text-sm font-semibold"}>Status</h3>
              <Badge variant={status.variant}>{status.text}</Badge>
            </div>
            {order.fulfillments?.map((fl) =>
              fl.tracking_links?.map((tn) => (
                <>
                  <hr className={"border-border"} />
                  <Alert variant={"default"} className={"flex justify-between items-baseline"}>
                    <AlertTitle className={"text-sm font-semibold"}>Tracking Number</AlertTitle>
                    <AlertDescription>
                      <Button
                        variant={"link"}
                        href={`https://www.royalmail.com/track-your-item#/tracking-results/${tn.tracking_number}`}
                        target={"_blank"}
                        className={"flex gap-3 items-center !text-inherit !h-auto"}
                      >
                        {tn.tracking_number}
                        <IconExternalLink size={16} />
                      </Button>
                    </AlertDescription>
                  </Alert>
                </>
              ))
            )}
          </div>
        </div>
        <Help />
      </div>
    </div>
  );
};

export default OrderCompletedTemplate;
