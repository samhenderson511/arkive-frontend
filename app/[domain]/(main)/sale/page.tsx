import { FilteredProductLayout } from "@/components/ui";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { getRegion } from "@/lib/data/getRegion";
import { getSaleProducts } from "@/lib/data/getSaleProducts";
import { notFound } from "next/navigation";
import { StoreTabPageProps } from "types/global";

export { generateMetadata } from "./metadata";

async function Sale(props: StoreTabPageProps) {
  const params = await props.params;
  const { tab, handle } = await getCategoryFromDomain(params.domain);
  const region = await getRegion(params.countryCode);

  const page = tab?.SalePageBanner;
  if (!page) return notFound();

  const products = await getSaleProducts(handle, region);

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

export default Sale;
