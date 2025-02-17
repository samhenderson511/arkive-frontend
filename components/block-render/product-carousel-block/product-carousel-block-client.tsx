"use client";

import { DefaultHit } from "@/components/search/default-hit";
import { Carousel } from "@/components/ui/carousel";
import { formatProduct } from "@/lib/util/format-product";
import { ApiProduct } from "@/types";

export function ProductCarouselBlockClient({
  products,
  rows,
}: {
  products: ApiProduct[];
  rows: number;
}) {
  return (
    <Carousel
      layout="padded"
      autoPlayDuration={5000}
      hideButtons
      className="px-0 w-full max-w-screen-2xl"
      classNames={{
        carouselItem: "basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5",
      }}
      items={products
        .reduce((acc, product, index) => {
          const row = Math.floor(index / rows);
          acc[row] = acc[row] || [];
          acc[row].push(product);
          return acc;
        }, [] as ApiProduct[][])
        .map((product, i) => (
          <div key={`row-${i}`} className="flex flex-col gap-6">
            {product.map((product) => (
              <DefaultHit key={product.id} hit={formatProduct(product)} truncate />
            ))}
          </div>
        ))}
    />
  );
}
