"use client";

import { useCart } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../form/input";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { toast } from "../ui/toast/use-toast";
import { CartItem } from "./cart-item";
import { CartTotals } from "./cart-totals";

const discountFormSchema = z.object({
  discountCode: z.string().min(1, { message: "Discount code is required" }),
});

export function CartPage() {
  const { cart } = useCart();
  const discountForm = useForm<z.infer<typeof discountFormSchema>>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: {
      discountCode: cart?.discountCode?.code,
    },
  });

  async function onSubmit(values: z.infer<typeof discountFormSchema>) {
    try {
      // Assuming an async login function
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        title: "Failed to submit the form. Please try again.",
        description: "Please try again.",
      });
    }
  }

  return (
    <div className="flex justify-center w-full px-4 lg:px-8">
      <div className="max-w-screen-xl flex gap-8 w-full flex-col sm:flex-row relative justify-start">
        <div className="flex flex-col gap-4 grow">
          <Text element="h1" elementStyle="h3" className="mb-4">
            Your Cart
          </Text>

          {cart?.lineItems.map((item) => (
            <CartItem
              key={item.productVariant.documentId}
              variant={item.productVariant}
              quantity={item.quantity}
            />
          ))}
        </div>

        <aside className="flex flex-col gap-4 basis-96 sm:shrink-0 sm:border-l sm:pl-8 sticky top-20 h-max">
          <Text element="h2" elementStyle="h3">
            Order Summary
          </Text>

          <CartTotals />

          <hr className="border-border" />

          <Button>Proceed to Checkout</Button>

          <Form {...discountForm}>
            <form
              onSubmit={discountForm.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 mt-6"
            >
              <FormField
                control={discountForm.control}
                name="discountCode"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="discountCode">Discount Code</FormLabel>
                    <FormControl>
                      <Input id="discountCode" placeholder="Enter discount code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="outline">
                Apply Discount
              </Button>
            </form>
          </Form>
        </aside>
      </div>
    </div>
  );
}
