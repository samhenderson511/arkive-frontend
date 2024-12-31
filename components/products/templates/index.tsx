import ProductInfo from "@/components/products/templates/product-info";
import { convertToHtml } from "@/lib/util/convertToHtml";
import type { Image, PricedProduct, Region } from "@medusajs/client-types";
import { BannerBrand } from "types/strapi";
import { ImageGallery } from "../components/image-gallery";
import { RecommendedProducts } from "../components/recommended-products";
import { Breadcrumbs } from "./breadcrumbs";

type ProductTemplateProps = {
  product: PricedProduct;
  brand: BannerBrand;
  region: Region;
};

async function ProductTemplate({ product, brand, region }: ProductTemplateProps) {
  const descriptionJSON = product.description?.[0] === "[" && JSON?.parse(product.description);

  const description =
    descriptionJSON?.[0]?.children ? convertToHtml(descriptionJSON) : product.description;

  const images = product?.variants?.flatMap((variant) =>
    (variant as any).images.map((image: Image) => image)
  );

  return (
    <>
      <div className={"flex flex-1 flex-col justify-center px-4 lg:px-8"}>
        <div className="relative flex flex-col w-full py-8 mx-auto gap-8 max-w-8xl">
          <Breadcrumbs product={product} />
          <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
            <div className="flex flex-col w-full gap-8">
              <ImageGallery
                images={
                  Boolean(images?.length) ? images
                  : Boolean(product.images?.length) ?
                    product.images
                  : [{ url: product.thumbnail }]
                }
                variants={product.variants}
              />
            </div>
            <div className="flex flex-col w-full py-8 sm:sticky sm:top-20 sm:py-0 gap-y-8">
              <ProductInfo product={product} brand={brand} region={region} />
              {description && description !== "null" && (
                <div
                  className={"prose dark:prose-invert prose-sm"}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <RecommendedProducts
        currentObjectIDs={[product.id]}
        fallBackProducts={[]}
        categoryName={product.categories[0].name}
        categoryHandle={product.categories[0].handle}
        region={region}
      />
    </>
  );
}

export default ProductTemplate;
