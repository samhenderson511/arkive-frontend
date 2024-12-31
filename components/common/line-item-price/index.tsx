"use client";

import { getPercentageDiff } from "@/lib/util/get-percentage-diff";
import { formatAmount } from "@/lib/util/prices";
import type { LineItem, PricedVariant, Region } from "@medusajs/client-types";
import { clsx } from "clsx";

type LineItemPriceProps = {
  item: Omit<LineItem, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">;
  region: Region;
  style?: "default" | "tight";
};

const LineItemPrice = ({ item, region, style = "default" }: LineItemPriceProps) => {
  const originalPrice = (item.variant as PricedVariant).original_price * item.quantity;
  const hasReducedPrice = (item.total || 0) < originalPrice;

  return (
    <div className="flex flex-col text-right text-muted-foreground">
      <span
        className={clsx({
          "text-destructive-foreground": hasReducedPrice,
        })}
      >
        {formatAmount({
          amount: item.total / 1.2 || 0,
          region: region,
          includeTaxes: true,
        })}
      </span>
      {hasReducedPrice && (
        <>
          <p>
            {style === "default" && <span className="text-muted-foreground">Original: </span>}
            <span className="line-through">
              {formatAmount({
                amount: originalPrice / 1.2,
                region: region,
                includeTaxes: false,
              })}
            </span>
          </p>
          {style === "default" && (
            <span className="text-destructive-foreground">
              -{getPercentageDiff(originalPrice, item.total || 0)}%
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default LineItemPrice;
