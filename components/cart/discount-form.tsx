"use client";

import { updateCart } from "@/lib/data";
import { useCart } from "@/lib/hooks";
import { strapiQuery } from "@/lib/strapi-query";
import { GBP } from "@/lib/util/format-price";
import { ApiDiscountCode } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../form/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "../ui/toast/use-toast";

const discountFormSchema = z.object({
  discountCode: z.string().min(1, { message: "Discount code is required" }),
});

export function DiscountForm() {
  const { cart, setCart, salePriceTotal } = useCart();
  const discountCode = cart?.discountCode;

  useEffect(() => {
    if (discountCode) {
      discountForm.setValue("discountCode", discountCode.code);
    }
  }, [discountCode]);

  const discountForm = useForm<z.infer<typeof discountFormSchema>>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: {
      discountCode: discountCode?.code || "",
    },
  });

  async function onSubmit(values: z.infer<typeof discountFormSchema>) {
    const discountCode = await strapiQuery<(ApiDiscountCode & { orders: { count: number } })[]>({
      path: "discount-codes",
      options: {
        filters: {
          code: values.discountCode,
        },
        populate: {
          orders: {
            count: true,
          },
        },
      },
    });

    const handleDiscountError = (message: string, description?: string) => {
      discountForm.setError("discountCode", {
        message,
      });
      toast({
        title: message,
        description,
        variant: "destructive",
      });
    };

    const discount = discountCode.data?.[0];
    if (!discount) {
      handleDiscountError("Invalid discount code", "Try another code.");
      return;
    }

    const validFrom = discount.startDate ? new Date(discount.startDate) : null;
    const validTo = discount.endDate ? new Date(discount.endDate) : null;

    if (discount.maxRedemptions && discount.maxRedemptions <= discount.orders.count) {
      handleDiscountError("Maximum redemptions reached", "Please try another code.");
      return;
    } else if (validFrom && validFrom > new Date()) {
      handleDiscountError("Discount not yet available", "Please try again later.");
      return;
    } else if (validTo && validTo < new Date()) {
      handleDiscountError("Discount code expired", "Please try another code.");
      return;
    } else if (discount.minimumTotal && discount.minimumTotal > salePriceTotal) {
      handleDiscountError(
        "Minimum order value not met",
        "Please add more items to your cart to use this code."
      );
      return;
    } else if (discount.maximumTotal && discount.maximumTotal < salePriceTotal) {
      handleDiscountError(
        "Maximum order value exceeded",
        "Please remove some items from your cart to use this code."
      );
      return;
    } else {
      await updateCart({ discountCode: discount.documentId })
        .then((res) => {
          setCart(res);
        })
        .catch((error) => {
          toast({
            title: "Error updating cart",
            description: error.message,
            variant: "destructive",
          });
        });
    }
  }

  return (
    <Form {...discountForm}>
      <form onSubmit={discountForm.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">
        <FormField
          control={discountForm.control}
          name="discountCode"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel htmlFor="discountCode">Discount Code</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input id="discountCode" placeholder="Enter discount code" {...field} />

                  {discountCode?.code === field.value && (
                    <div className="absolute right-2">
                      {discountCode.percentageOff && (
                        <Badge variant="success">{discountCode.percentageOff}% off</Badge>
                      )}

                      {discountCode.amountOffTotal && (
                        <Badge variant="success">
                          {GBP.format(discountCode.amountOffTotal)} off
                        </Badge>
                      )}

                      {discountCode.amountOffPerItem && (
                        <Badge variant="success">
                          {GBP.format(discountCode.amountOffPerItem)} off per item
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {discountCode ?
          <Button
            variant="destructive"
            onClick={async () => {
              await updateCart({ discountCode: null })
                .then((res) => {
                  setCart(res);
                  discountForm.reset();
                })
                .catch((error) => {
                  toast({
                    title: "Error updating cart",
                    description: error.message,
                    variant: "destructive",
                  });
                });
            }}
          >
            Remove Discount
          </Button>
        : <Button type="submit" variant="outline">
            Apply Discount
          </Button>
        }
      </form>
    </Form>
  );
}
