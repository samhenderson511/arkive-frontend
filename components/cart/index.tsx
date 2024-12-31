"use client";

import DiscountCode from "@/components/checkout/components/discount-code";
import { ProductList } from "@/components/home/components/product-list";
import { getCustomer } from "@/lib/medusaClient";
import { searchClient } from "@/lib/search-client";
import type { Cart, LineItem, Region } from "@medusajs/client-types";
import { useLookingSimilar } from "react-instantsearch-core";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import EmptyCartMessage from "../components/empty-cart-message";
import SignInPrompt from "../components/sign-in-prompt";
import ItemsTemplate from "./items";
import Summary from "./summary";

interface CartTemplateProps {
  region: Region;
  cart: Omit<Cart, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">;
  customer: ReturnType<typeof getCustomer>;
  cartItems: Omit<LineItem, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">[];
}

const CartTemplate = (props: CartTemplateProps) => (
  <InstantSearchNext searchClient={searchClient} indexName="products">
    <CartTemplateContent {...props} />
  </InstantSearchNext>
);

const CartTemplateContent = ({ region, cartItems, cart, customer }: CartTemplateProps) => {
  const currentObjectIDs = cartItems?.map((i) => i?.variant?.product_id);

  const { items } = useLookingSimilar({
    objectIDs: currentObjectIDs,
    limit: 10,
  });

  const products = items?.filter((p: any) => currentObjectIDs.indexOf(p.objectID || p.id) === -1);

  return (
    <div className="flex flex-col items-center px-4 py-6 lg:py-12 bg-card lg:px-8">
      <div className="w-full max-w-7xl">
        {cart?.items?.length ?
          <div className={"flex flex-col gap-4 lg:gap-8"}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_416px] gap-4 lg:gap-8">
              <div className="flex flex-col p-4 border rounded-sm lg:p-6 lg:pt-8 bg-background border-border">
                {!customer && <SignInPrompt />}
                <ItemsTemplate region={cart?.region} items={cartItems} />
              </div>
              <div className="relative">
                <div className="sticky flex flex-col gap-y-4 lg:gap-y-8 top-12">
                  {cart && cart.region && (
                    <>
                      <Summary cart={cart} />
                      <DiscountCode cart={cart} />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={"bg-background rounded-sm border border-border flex"}>
              <ProductList
                className={"lg:px-6"}
                title={"You may also like"}
                categoryName={"related items"}
                rows={1}
                products={products as any}
                region={region}
              />
            </div>
          </div>
        : <div className={"flex flex-col w-full"}>
            {!customer && <SignInPrompt />}
            <EmptyCartMessage />
          </div>
        }
      </div>
    </div>
  );
};

export default CartTemplate;
