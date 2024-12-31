import { FilteredProductLayout } from "@/components/common";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { getRegion } from "@/lib/data/getRegion";
import { notFound } from "next/navigation";
import { StoreTabPageProps } from "types/global";

export { generateMetadata } from "./metadata";

export default async function Search(props: StoreTabPageProps) {
  const params = await props.params;
  const { tab } = await getCategoryFromDomain(params.domain, 4);
  const page = tab.SearchPageBanner;

  if (!page) return notFound();

  const region = await getRegion(params.countryCode);

  return (
    <FilteredProductLayout
      page={page}
      enableSearch
      category={tab}
      products={[]}
      region={region}
      filterData={[]}
    />
  );
}

export const maxDuration = 60;
