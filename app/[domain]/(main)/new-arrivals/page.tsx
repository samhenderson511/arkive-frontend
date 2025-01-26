import { SearchContext } from "@/components";
import { BannerBlock } from "@/components/block-render/banner-block";
import { Transition } from "@/components/layout/transition";
import { DefaultResults } from "@/components/search/default-results";
import { getSite } from "@/lib/server";

export default async function NewArrivals({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;

  const site = await getSite(decodeURIComponent(domain), {
    populate: { newArrivalsBanner: { populate: { background: true } }, category: true },
  });

  return (
    <>
      <Transition transitionName="fadeInUp">
        <BannerBlock {...site.newArrivalsBanner} className="h-72 lg:h-80 [&>div]:lg:pb-8 " />
      </Transition>

      <SearchContext
        indexName={"arkive:products"}
        configure={{ hitsPerPage: 36, filters: `categories.cat:=:${site.category.name}` }}
      >
        <Transition waitForInView transitionName="fadeInUp">
          <DefaultResults rootPath={site.category.name} />
        </Transition>
      </SearchContext>
    </>
  );
}
