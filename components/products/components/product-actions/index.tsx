"use client";

import { Logo } from "@/components/common";
import { Button } from "@/components/common/button";
import { EmptyState } from "@/components/home/components/product-list/empty-state";
import OptionSelect from "@/components/products/components/option-select";
import { addToCart } from "@/lib/data";
import { toTitleCase } from "@/lib/util";
import { addOrUpdateSearchParam, removeSearchParam } from "@/lib/util/updateSearchParams";
import { PricedProduct, PricedVariant, Region } from "@medusajs/client-types";
import { track } from "@vercel/analytics";
import { barlow } from "app/fonts";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import slugify from "slugify";
import { StoreTabPageProps } from "types/global";
import { BannerBrand } from "types/strapi";
import { ProductPrice } from "../product-preview";

type ProductActionsProps = {
  product: PricedProduct;
  brand: BannerBrand;
  region: Region;
};

const ProductActions: React.FC<ProductActionsProps> = ({ product, brand, region }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params: StoreTabPageProps["params"] = useParams();
  const searchParams = useSearchParams();

  const variant = product.variants?.find((v) => v.title === searchParams.get("variant"));

  const allOptions = product.variants?.flatMap((v) => v.options);
  const optionTitles = product.options.map((o) => o.title);
  const options = optionTitles
    .map((title) => {
      const optionParam = searchParams.get(title);
      const option = allOptions?.find((o) => o.value === optionParam);
      return option;
    })
    .filter(Boolean);

  useEffect(() => {
    const variant = product.variants?.find((v) => {
      return v.options.every((o) => options.some((po) => po.value === o.value));
    });

    if (variant && variant.title !== searchParams.get("variant")) {
      track("Variant Selected", { variant: variant.title });
      router.push(
        pathname +
          "?" +
          addOrUpdateSearchParam({
            searchParams,
            key: "variant",
            value: variant.title,
          }),
        { scroll: false }
      );
    } else if (options?.length !== product.options?.length && searchParams.get("variant")) {
      router.push(
        pathname +
          "?" +
          removeSearchParam({
            searchParams,
            key: "variant",
          }),
        { scroll: false }
      );
    }
  }, [searchParams]);

  const inStock = variant?.inventory_quantity > 0;

  function renderButtonText() {
    if (options?.length < optionTitles?.length) {
      return "Select Your Options";
    } else if (inStock) {
      return "Add to Basket";
    } else {
      return "Out of Stock";
    }
  }

  return (
    <>
      {brand?.attributes && (
        <Link
          className={"mb-4 opacity-50"}
          href={`/brands/${slugify(brand.attributes?.BrandBanner?.Title || "", {
            lower: true,
          })}`}
        >
          <Logo logo={brand.attributes.Logo.data} />
        </Link>
      )}

      <div className={"mb-4"}>
        <h3 className={clsx(barlow.className, "text-4xl")}>{product.title}</h3>

        {product.subtitle && <p className="text-base-regular">{product.subtitle}</p>}
      </div>

      {Boolean(product.variants?.length) ?
        <div className="flex flex-col gap-4">
          {product.options?.map((option) => (
            <div key={option.id}>
              <OptionSelect
                current={options.find((o) => o.option_id === option.id)?.value}
                title={option.title}
                hasStock={product.variants}
              />
            </div>
          ))}
        </div>
      : <EmptyState
          className={"items-start text-start mt-4"}
          title={"This item is currently out of stock"}
          categoryName={toTitleCase(product.title)}
        />
      }

      {Boolean(product.variants?.length) && (
        <ProductPrice
          region={region}
          className={"text-2xl"}
          variant={(variant as PricedVariant) || product.variants[0]}
        />
      )}

      {Boolean(product.variants?.length) && (
        <Button
          size={"lg"}
          onClick={async () => {
            await addToCart({
              variantId: variant.id,
              quantity: 1,
              countryCode: params.countryCode,
            })
              .then(() => {
                router.push(
                  pathname +
                    "?" +
                    new URLSearchParams(searchParams.toString()) +
                    "&" +
                    new URLSearchParams({ cart: "true" }),
                  { scroll: false }
                );
              })
              .then(() => {
                router.refresh();
              })
              .then(() => {
                track("Add to Basket", { productName: product.title });
              });
          }}
          disabled={!variant || !inStock}
        >
          {renderButtonText()}
        </Button>
      )}
    </>
  );
};

export default ProductActions;
