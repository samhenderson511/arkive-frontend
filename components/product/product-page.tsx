import { Button, Text } from "@/components";
import { BlocksRenderer } from "@/components/block-render/strapi-blocks-renderer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { GBP, getSite, strapiQuery, transformAsset } from "@/lib/server";
import { convertToPlainText } from "@/lib/util/convert-to-plain-text";
import { getVariantPrice } from "@/lib/util/format-product";
import { ApiCategory, ApiProduct, ApiProductVariant } from "@/types";
import clsx from "clsx";
import { notFound } from "next/navigation";
import { plural } from "pluralize";
import { Product as ProductSchema, WithContext } from "schema-dts";
import { ProductCarouselBlock } from "../block-render/product-carousel-block";
import { ProductActions } from "./product-actions";
import { ProductImages } from "./product-images";

export async function ProductPage({
  params,
}: {
  params: Promise<{
    domain: string;
    department: string;
    subDepartment: string;
    product: string;
    variant?: string;
  }>;
}) {
  const {
    domain,
    department,
    subDepartment,
    product: productParam,
    variant: variantParam,
  } = await params;

  const site = await getSite(domain, { populate: ["category"] });

  if (!site) {
    return notFound();
  }

  const product = await strapiQuery<ApiProduct[]>({
    path: "products",
    options: {
      populate: {
        images: {
          populate: { colours: { populate: { colourGroup: true } }, images: true },
        },
        applicableSales: { fields: ["name", "discountPercentage"] },
        brand: { fields: ["name"] },
        season: { fields: ["name"] },
        categories: { populate: { children: true, parent: true } },
        variants: {
          filters: {
            stock: { $gt: 0 },
          },
          fields: ["size", "name"],
          populate: { colour: { populate: { colourGroup: true } } },
        },
      },
      filters: {
        name: { $eqi: decodeURIComponent(productParam) },
      },
    },
  }).then((res) => res.data?.[0]);

  if (!product) {
    return notFound();
  }

  const variant = await strapiQuery<ApiProductVariant[]>({
    path: "product-variants",
    options: {
      populate: {
        colour: { populate: { colourGroup: true } },
        product: { populate: { applicableSales: { fields: ["name", "discountPercentage"] } } },
      },
      filters:
        variantParam ?
          {
            product: { documentId: { $eq: product.documentId } },
            name: { $eqi: decodeURIComponent(variantParam) },
          }
        : {
            product: { documentId: { $eq: product.documentId } },
            stock: { $gt: 0 },
          },
    },
  }).then((res) => res.data?.[0]);

  const variantImages =
    product.images?.find((img) =>
      img.colours.every((c) => variant?.colour?.some((v) => v.name === c.name))
    ) || product.images?.[0];

  const images = await Promise.all(
    (variantImages?.images || Array.from({ length: 1 })).map(
      async (img) => await transformAsset(img)
    )
  );

  const { price, salePrice } = getVariantPrice(variant);

  const jsonLd: WithContext<ProductSchema> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: variantImages?.thumbnail?.url,
    description: convertToPlainText(product.description),
    sku: variant?.sku,
    category: product.categories?.map((cat) => cat.name),
    brand: {
      "@type": "Brand",
      name: product.brand?.name,
      logo: product.brand?.logo?.url,
      description: product.brand?.banner?.description,
      image: product.brand?.banner?.background?.url,
    },
    size: variant?.size,
    url: `${domain}/${department}/${subDepartment}/${product}`,
    offers: {
      "@type": "Offer",
      url: `${domain}/${department}/${subDepartment}/${product}`,
      priceCurrency: "GBP",
      price: salePrice.toFixed(2),
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Arkive Clothing",
        logo: site.logo?.url,
        url: domain,
        sameAs: [site.facebook, site.instagram, site.twitter].filter(Boolean),
      },
    },
  };

  return (
    <>
      <div className="flex flex-col items-center w-full px-4 lg:p-8 p-4">
        <div className="grid relative grid-cols-1 sm:grid-cols-5 w-full gap-8 max-w-screen-2xl">
          <div className="flex flex-col sm:col-span-2 gap-8 sticky sm:top-24">
            <Breadcrumbs />

            <ProductImages images={images} />
          </div>

          <div className="flex flex-col sm:col-span-3 gap-6">
            <Text element="h2" elementStyle="h5">
              <Button
                className="px-0 h-auto text-muted-foreground"
                variant="link"
                size="lg"
                href={`/brands/${encodeURIComponent(product.brand.name.toLowerCase())}`}
              >
                {product.brand.name}
              </Button>
            </Text>

            <Text element="h1" elementStyle="h2" className="capitalize border-none">
              {product.name.toLowerCase()}
            </Text>

            <ProductActions product={product} variant={variant} />

            <div className="flex gap-3">
              <Text
                element="span"
                elementStyle="h3"
                className={clsx(
                  {
                    "line-through": salePrice !== price,
                  },
                  "text-muted-foreground leading-none"
                )}
              >
                {GBP.format(price)}
              </Text>

              {salePrice !== price && (
                <Text element="span" elementStyle="h3" className="text-destructive leading-none">
                  {GBP.format(salePrice)}
                </Text>
              )}
            </div>

            {product.description && <BlocksRenderer content={product.description} />}
          </div>
        </div>
      </div>

      <ProductCarouselBlock
        brands={[]}
        button={{
          children: `Browse ${site.category.name.toLowerCase()} ${plural(department)}`,
          variant: "Outline",
          href: `/${encodeURIComponent(department.toLowerCase())}`,
          size: "Small",
        }}
        onSaleOnly={false}
        rows={1}
        title="You may also like"
        categories={[
          product.categories.find(
            (cat) => cat.name.toLowerCase() === department.toLowerCase()
          ) as ApiCategory,
        ]}
        limit={15}
        site={site}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
