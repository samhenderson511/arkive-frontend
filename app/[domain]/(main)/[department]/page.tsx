import { FilteredProductLayout } from "@/components/ui";
import { strapiFetch } from "@/lib/api";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { getCategoryProducts } from "@/lib/data/getCategoryProducts";
import { getCategoryTitle } from "@/lib/data/getCategoryTitle";
import { getDepartments } from "@/lib/data/getDepartments";
import { getRegion } from "@/lib/data/getRegion";
import { notFound } from "next/navigation";
import { DepartmentPageProps, StoreTabPageProps } from "types/global";
import { BannerCategory } from "types/strapi";

export { generateMetadata } from "./metadata";

export async function generateStaticParams({ params }: StoreTabPageProps) {
  const { handle } = await getCategoryFromDomain(params.domain);
  const departments = await getDepartments(handle);

  const newParams = departments?.map((dep) => ({
    domain: params.domain,
    department: dep.name,
  }));

  return newParams || [];
}

export default async function Department(props: DepartmentPageProps) {
  const params = await props.params;
  const { domain, department, countryCode } = params;
  const { tab, handleAsParam } = await getCategoryFromDomain(domain);
  const region = await getRegion(countryCode);

  const handle = `/${handleAsParam}/${department}`.toUpperCase();

  const page: BannerCategory[] = await strapiFetch({
    endpoint: "banner-categories",
    params: { "filters[Handle][$eq]": handle },
    depth: 3,
  });

  if (!page?.[0]?.attributes?.CategoryBanner?.Title) {
    const title = await getCategoryTitle(handle);

    if (!title) return notFound();

    page.push({
      attributes: {
        CategoryBanner: {
          Title: title,
        },
      },
    });
  }

  const filterData = await getCategoryProducts({
    categoryHandle: handle,
    region,
    productOptions: {
      select: ["id", "handle", "metadata"],
      relations: [],
    },
    variantOptions: {
      fields: "id,product_id,metadata",
      expand: "prices",
    },
    limit: 1000,
  });

  const products = await getCategoryProducts({
    categoryHandle: handle,
    region,
    limit: 72,
  });
  if (!products?.length) {
    return notFound();
  }

  return (
    <FilteredProductLayout
      filterData={filterData}
      region={region}
      page={page?.[0].attributes.CategoryBanner}
      category={tab}
      products={products}
    />
  );
}

export const maxDuration = 60;
