import { FilteredProductLayout } from "@/components/common";
import { strapiFetch } from "@/lib/api";
import { getCategoryBrands } from "@/lib/data/getCategoryBrands";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { getCategoryProducts } from "@/lib/data/getCategoryProducts";
import { getRegion } from "@/lib/data/getRegion";
import { toTitleCase } from "@/lib/util";
import { notFound } from "next/navigation";
import slugify from "slugify";
import { BrandPageProps } from "types/global";
import { BannerBrand } from "types/strapi";

export { generateMetadata } from "./metadata";

export async function generateStaticParams({ params }: BrandPageProps) {
  const { handle } = await getCategoryFromDomain(params.domain);
  const brands = await getCategoryBrands(handle);

  const newParams = brands.map((brand) => ({
    domain: params.domain,
    brand: slugify(brand.attributes?.BrandBanner?.Title, {
      lower: true,
    }),
  }));

  return newParams || [];
}

export default async function Brand(props: BrandPageProps) {
  const params = await props.params;
  const { brand: slugifiedBrand, domain, countryCode } = params;
  const brand = slugifiedBrand.replaceAll("-", " ");
  const region = await getRegion(countryCode);

  const { handle, tab } = await getCategoryFromDomain(domain);
  const categoryBrand: BannerBrand[] = await strapiFetch({
    endpoint: "banner-brands",
    params: { "filters[BrandBanner][Title][$eqi]": brand },
    depth: 4,
  });
  const page = categoryBrand?.[0]?.attributes;

  if (!page) return notFound();

  const tag = categoryBrand?.[0]?.attributes?.BrandBanner?.Title;

  const products = await getCategoryProducts({
    categoryHandle: handle,
    region,
    limit: 100,
    tags: [tag.toUpperCase(), tag.toLowerCase(), toTitleCase(tag)],
  });

  return (
    <FilteredProductLayout
      logo={page.Logo.data}
      region={region}
      showLogo
      page={page?.BrandBanner}
      category={tab}
      products={products}
      filterData={products}
    />
  );
}

export const dynamicParams = true;
