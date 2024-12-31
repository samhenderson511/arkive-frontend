"use client";

import { ProductPreview } from "@/components/products/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { Product } from "@medusajs/client-types";
import clsx from "clsx";

export function InfiniteScrollList({ products, region }: { products: Product[]; region: any }) {
  const [animate] = useAutoAnimate();

  return (
    <div
      ref={animate}
      className={clsx(
        "grid flex-1 w-full grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
        products.length === 0 && "gap-3"
      )}
    >
      {products.length === 0 &&
        Array.from({ length: 36 }).map((_, i) => (
          <div
            className={
              "h-[calc(160px+95vw)] xs:h-[calc(160px+45vw)] md:h-[calc(160px+25vw)] lg:h-[calc(160px+26vw)] xl:h-[calc(160px+21vw)] 2xl:h-[calc(160px+16vw)] bg-muted animate-pulse rounded-sm"
            }
            key={i}
          />
        ))}
      {products.length > 0 &&
        products.map((product) => (
          <ProductPreview
            key={product.id}
            handle={product.handle}
            id={product.id}
            variants={product.variants as any}
            metadata={product.metadata as any}
            title={product.title}
            thumbnail={product.thumbnail}
            region={region}
          />
        ))}
    </div>
  );
}
