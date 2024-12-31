"use client";

import { ProductList } from "@/components/block-render/product-carousel-block";
import { searchClient } from "@/lib/search-client";
import type { Product } from "@medusajs/client-types";
import { useLookingSimilar } from "react-instantsearch-core";
import { InstantSearchNext } from "react-instantsearch-nextjs";

export interface RecommendedProductsProps {
  currentObjectIDs: string[];
  fallBackProducts: Product[];
  fallBackTitle?: string;
  region: any;
  categoryName: string;
  categoryHandle: string;
}

export const RecommendedProducts = (props: RecommendedProductsProps) => (
  <InstantSearchNext searchClient={searchClient} indexName="products">
    <RecommendedProductsContent {...props} />
  </InstantSearchNext>
);

const RecommendedProductsContent = ({
  currentObjectIDs,
  fallBackProducts,
  fallBackTitle,
  categoryName,
  region,
  categoryHandle,
}: RecommendedProductsProps) => {
  const { items } = useLookingSimilar({
    objectIDs: currentObjectIDs,
    limit: 10,
  });

  const products = (items?.length > 5 ? items : fallBackProducts).filter(
    (p: any) => currentObjectIDs.indexOf(p.objectID || p.id) === -1 && p.status === "published"
  );

  return (
    <ProductList
      products={products as any}
      categoryName={categoryName}
      href={categoryHandle.toLowerCase()}
      rows={1}
      title={fallBackTitle || "You may also like"}
      region={region}
    />
  );
};
