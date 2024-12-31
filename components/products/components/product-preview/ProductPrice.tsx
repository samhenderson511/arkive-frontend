"use client";

import { getVariantPrice } from "@/lib/data/getVariantPrice";
import { formatAmount } from "@/lib/util/prices";
import { PricedVariant, Region } from "@medusajs/client-types";
import clsx from "clsx";
import { cache, useEffect, useMemo, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  region: Region;
  variant: PricedVariant;
  quantity?: number;
}

function ProductPrice({ variant: serverVariant, region, className, quantity = 1, ...rest }: Props) {
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    const fetchVariant = cache(async () => {
      try {
        const clientVariant = await getVariantPrice(serverVariant.id, region.id);

        setVariant(clientVariant);
      } catch (error) {
        console.error("Failed to fetch variant", error);
      }
    });

    if (!serverVariant?.calculated_price && serverVariant?.id) {
      fetchVariant();
    } else {
      setVariant(serverVariant);
    }
  }, [serverVariant]);

  const { calculatedPrice, originalPrice, calculatedPriceType } = useMemo(() => {
    if (variant?.calculated_price && variant?.original_price && variant && region) {
      const calculatedPrice = formatAmount({
        amount: variant.calculated_price * quantity,
        region: region,
        includeTaxes: true,
      });

      const originalPrice = formatAmount({
        amount: variant.original_price * quantity,
        region: region,
        includeTaxes: true,
      });

      const calculatedPriceType = variant.calculated_price_type;

      return { calculatedPrice, originalPrice, calculatedPriceType };
    }
    // Default values if conditions aren't met
    return { calculatedPrice: "", originalPrice: "", calculatedPriceType: "" };
  }, [region, quantity, variant]);

  return Boolean(calculatedPrice && variant && region) ?
      <div className={clsx("flex flex-col leading-tight justify-center h-10", className)} {...rest}>
        {calculatedPriceType === "sale" && (
          <span className="line-through text-muted-foreground">{originalPrice}</span>
        )}
        <span
          className={clsx("font-semibold", {
            "text-destructive-foreground": calculatedPriceType === "sale",
          })}
        >
          {calculatedPrice}
        </span>
      </div>
    : <div className={"h-7 my-2.5 w-16 bg-muted rounded animate-pulse"} />;
}

export { ProductPrice };
