import { FilteredProductLayout } from "@/components/common";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { getCategoryProducts } from "@/lib/data/getCategoryProducts";
import { getRegion } from "@/lib/data/getRegion";
import { notFound } from "next/navigation";
import { StoreTabPageProps } from "types/global";

export { generateMetadata } from "./metadata";

async function NewArrivals(props: StoreTabPageProps) {
  const params = await props.params;
  const { tab, handle } = await getCategoryFromDomain(params.domain, 4);
  const page = tab.NewArrivalsPageBanner;
  const region = await getRegion(params.countryCode);

  if (!page) return notFound();

  const products = await getCategoryProducts({
    categoryHandle: handle,
    region,
    limit: 100,
  });

  return (
    <FilteredProductLayout
      page={page}
      category={tab}
      region={region}
      products={products}
      filterData={products}
    />
  );
}

export default NewArrivals;
