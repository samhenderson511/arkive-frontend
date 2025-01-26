import { Button } from "@/components/ui";
import { barlow } from "app/fonts";
import clsx from "clsx";
import Image from "next/image";

export function OrdersEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-8 py-12 text-center border rounded-sm border-border bg-background gap-6">
      <div className={"grow w-full relative flex items-center max-w-48"}>
        <Image alt={"Empty cart"} src={"/Void-Illustr.svg"} fill className={"!relative w-full"} />
      </div>
      <div className={"flex flex-col gap-4"}>
        <h1 className={clsx(barlow.className, "uppercase leading-none text-2xl")}>
          No recent orders
        </h1>
        <p className="prose-sm prose dark:prose-invert">
          You haven't ordered anything yet, but check out our latest products. You might find
          something you like.
        </p>
      </div>
      <div>
        <Button size={"lg"} href="/">
          Explore products
        </Button>
      </div>
    </div>
  );
}
