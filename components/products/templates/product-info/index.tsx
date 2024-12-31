import ProductActions from "@/components/products/components/product-actions";
import type { PricedProduct, Region } from "@medusajs/client-types";
import React from "react";
import { BannerBrand } from "types/strapi";

type ProductInfoProps = {
  product: PricedProduct;
  brand: BannerBrand;
  region: Region;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product, brand, region }) => (
  <div id="product-info">
    <div className="flex flex-col mx-auto gap-y-4">
      <ProductActions product={product} brand={brand} region={region} />
    </div>
  </div>
);

export default ProductInfo;
