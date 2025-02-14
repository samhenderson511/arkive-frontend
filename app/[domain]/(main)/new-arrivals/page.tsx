import { SearchContext } from "@/components";
import { getMarginClassNames } from "@/components/block-render";
import { BannerBlock } from "@/components/block-render/banner-block";
import { Transition } from "@/components/layout/transition";
import { DefaultResults } from "@/components/search/default-results";
import { getSite } from "@/lib/server";
import { notFound } from "next/navigation";

export default async function NewArrivals({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;

  const site = await getSite(decodeURIComponent(domain), {
    populate: { newArrivalsBanner: { populate: { background: true } }, category: true },
  });

  if (!site) {
    return notFound();
  }

  const hasBanner = site.newArrivalsBanner?.title || site.newArrivalsBanner?.background;

  return (
    <>
      {hasBanner && (
        <Transition transitionName="fadeInUp">
          <BannerBlock {...site.newArrivalsBanner} />
        </Transition>
      )}

      <SearchContext
        indexName={"arkive:products"}
        configure={{ hitsPerPage: 36, filters: `categories.cat:=:${site.category.name}` }}
      >
        <Transition waitForInView transitionName="fadeInUp">
          <DefaultResults
            rootPath={site.category.name}
            className={getMarginClassNames({
              topMargin: hasBanner ? "Less" : "More",
              bottomMargin: "Default",
            })}
          />
        </Transition>
      </SearchContext>
    </>
  );
}
