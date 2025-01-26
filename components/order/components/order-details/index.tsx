import { Button } from "@/components/ui";
import type { Order } from "@medusajs/client-types";
import {
  IconArrowLeft,
  IconCircleCheck,
  IconConfetti,
  IconGift,
  IconHeart,
  IconMoodCrazyHappy,
  IconMoodHappy,
  IconPackage,
  IconPackages,
  IconReceipt,
  IconReceiptPound,
  IconSquareRoundedCheck,
  IconThumbUp,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { barlow } from "app/fonts";
import clsx from "clsx";
import { format } from "date-fns";

type OrderDetailsProps = {
  order: Order;
};

const getIcon = (displayId: number) => {
  const icons = [
    IconThumbUp,
    IconConfetti,
    IconCircleCheck,
    IconSquareRoundedCheck,
    IconMoodHappy,
    IconMoodCrazyHappy,
    IconGift,
    IconTruckDelivery,
    IconReceipt,
    IconReceiptPound,
    IconHeart,
    IconPackage,
    IconPackages,
  ];

  const index = displayId % icons.length;
  return icons[index];
};

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const IconComponent = getIcon(order.display_id);
  const currentDate = new Date();
  const isOrderPlacedWithinHour =
    new Date(order.created_at).getTime() > currentDate.getTime() - 60 * 60 * 1000;

  return (
    <>
      <div className={"flex justify-between items-baseline px-4 sm:px-8 py-4"}>
        <Button variant={"link"} href={"/account"} className={"gap-3"}>
          <IconArrowLeft size={20} />
          Back to account
        </Button>
      </div>
      <div className={"flex flex-col px-4 sm:px-8 py-4 gap-8"}>
        {isOrderPlacedWithinHour && (
          <div className={"flex flex-col py-4 items-center justify-center text-center"}>
            <IconComponent size={100} stroke={1} className={"my-4"} />
            <h3 className={clsx(barlow.className, "text-2xl uppercase")}>Thanks for your order!</h3>
            <p className={"prose prose-sm dark:prose-invert"}>
              We'll be in touch with collection or tracking information in the next couple of days
            </p>
          </div>
        )}
        <div className="flex flex-col items-baseline justify-between sm:flex-row gap-4">
          <h1 className={clsx(barlow.className, "uppercase text-3xl")}>
            Order # {order.display_id}
          </h1>
          <span className={"text-muted-foreground"}>
            Placed on {format(new Date(order.created_at), "EEE do MMM, yyyy")}
          </span>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
