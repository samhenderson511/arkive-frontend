import { Button } from "@/components/common";
import { barlow } from "app/fonts";
import clsx from "clsx";
import Image from "next/image";

const EmptyCartMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-24 text-center bg-background">
      <div className={"grow w-full relative flex items-center max-w-md mb-8"}>
        <Image alt={"Empty cart"} src={"/Void-Illustr.svg"} fill className={"!relative w-full"} />
      </div>
      <h1 className={clsx(barlow.className, "uppercase text-3xl")}>Your shopping bag is empty</h1>
      <p className="mt-4 mb-6 prose-sm prose dark:prose-invert max-w-prose">
        Empty cart? That's just an opportunity to fill it with goodies! Check out our latest
        products.
      </p>
      <div>
        <Button size={"lg"} href="/">
          Explore products
        </Button>
      </div>
    </div>
  );
};

export default EmptyCartMessage;
