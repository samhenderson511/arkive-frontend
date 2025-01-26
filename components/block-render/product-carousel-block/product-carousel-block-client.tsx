"use client";

import { DefaultHitSkeleton } from "@/components/search/default-hit-skeleton";
import { Carousel } from "@/components/ui/carousel";
import { formatProduct } from "@/lib/util/format-product";
import { ApiProduct } from "@/types";
import dynamic from "next/dynamic";

// use a dynamic import to avoid the image throwing a hydration error, as when it comes from typesense it will need to be rendered on the client
export const DefaultHit = dynamic(() => import("../../search/default-hit"), {
  ssr: false,
  loading: () => <DefaultHitSkeleton />,
});

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
        carouselItem: "basis-1/2 lg:basis-1/3 xl:basis-1/4",
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
