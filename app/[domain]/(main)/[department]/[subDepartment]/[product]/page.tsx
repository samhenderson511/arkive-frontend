import ProductTemplate from "@/components/products/templates";
import { strapiFetch } from "@/lib/api";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { getCategoryProductHandles } from "@/lib/data/getCategoryProductHandles";
import { getPricedProduct } from "@/lib/data/getPricedProduct";
import { getRegion } from "@/lib/data/getRegion";
import { notFound } from "next/navigation";
import { Product as ProductSchema, WithContext } from "schema-dts";
import slugify from "slugify";
import { ProductPageProps, StoreTabPageProps } from "types/global";
import { BannerBrand } from "types/strapi";

export { generateMetadata } from "./metadata";

export async function generateStaticParams({ params }: StoreTabPageProps) {
  const { handle } = await getCategoryFromDomain(params.domain);
  const products = await getCategoryProductHandles(handle);

  const newParams = products
    ?.map((prod) => {
      const split = prod.handle.toLowerCase().split("/");

      return {
        domain: params.domain,
        department: split[2],
        subDepartment: split[3],
        product: split[4],
      };
    })
    .filter(Boolean);

  return newParams || [];
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const { department, product, domain, subDepartment, countryCode } = params;

  const { tab, handle, handleAsParam } = await getCategoryFromDomain(domain);
  const region = await getRegion(countryCode);

  const categoryHandle =
    `/${handleAsParam}/${slugify(department, { strict: true })}/${slugify(subDepartment, { strict: true })}`.toUpperCase();
  const productHandle = `${categoryHandle}/${slugify(product, { strict: true })}`.toUpperCase();

  const pricedProduct = await getPricedProduct(productHandle, categoryHandle, region);

  if (!pricedProduct) {
    return notFound();
  }

  const brand: BannerBrand[] = await strapiFetch({
    endpoint: "banner-brands",
    params: {
      "filters[BrandBanner][Title][$eqi]": pricedProduct.metadata.brand as string,
    },
    depth: 4,
  });

  const jsonLd: WithContext<ProductSchema> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pricedProduct.title,
    image: [pricedProduct.thumbnail, ...pricedProduct.images.map((i) => i.url)],
    description: pricedProduct.description,
    sku: pricedProduct.variants?.[0]?.sku,
    category: handle.split("/").slice(1, 3).join("/"),
    brand: {
      "@type": "Brand",
      name: brand[0]?.attributes?.BrandBanner?.Title,
      logo: brand[0]?.attributes?.Logo?.data?.attributes?.url,
      description: brand[0]?.attributes?.BrandBanner?.Description,
      image: brand[0]?.attributes?.BrandBanner?.Background?.data?.[0]?.attributes?.url,
    },
    offers: {
      "@type": "Offer",
      url: domain + handle,
      priceCurrency: pricedProduct.variants?.[0]?.prices?.[0]?.currency_code,
      price: ((pricedProduct.variants?.[0]?.prices?.[0].amount / 100) * 1.2).toFixed(2),
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: tab?.BrandTitle,
        logo: tab?.Logo?.data?.attributes?.url,
        url: domain,
        sameAs: [tab?.FaceBook, tab?.Instagram, tab?.Twitter].filter(Boolean),
      },
    },
  };

  return (
    <>
      <ProductTemplate product={pricedProduct} brand={brand[0]} region={region} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

export const maxDuration = 60;
