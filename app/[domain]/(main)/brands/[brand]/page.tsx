import { SearchContext } from "@/components";
import { getMarginClassNames } from "@/components/block-render";
import { BannerBlock } from "@/components/block-render/banner-block";
import { Transition } from "@/components/layout/transition";
import { DefaultResults } from "@/components/search/default-results";
import { getSite, strapiQuery } from "@/lib/server";
import { ApiBrand } from "@/types";
import { notFound } from "next/navigation";

export async function generateStaticParams({ params: { domain } }: { params: { domain: string } }) {
  const site = await getSite(domain, {});

  if (!site) {
    return [];
  }

  const { data: brands } = await strapiQuery<ApiBrand[]>({
    path: "brands",
    options: {
      populate: { logo: true, banner: { populate: { background: true } } },
      filters: {
        products: {
          categories: {
            documentId: {
              $in: site.category.documentId,
            },
          },
          variants: {
            stock: {
              $gt: 0,
            },
          },
        },
      },
    },
  });

  const params = brands.map((brand) => ({
    domain: site.domain,
    brand: brand.name.toLowerCase(),
  }));

  return params || [];
}

export default async function Brand({
  params,
}: {
  params: Promise<{ domain: string; brand: string }>;
}) {
  const { domain, brand: brandParam } = await params;

  const site = await getSite(domain, {
    populate: { category: true },
  });

  if (!site) {
    return notFound();
  }

  const { banner, logo, ...brand } = await strapiQuery<ApiBrand[]>({
    path: "brands",
    options: {
      populate: { logo: true, banner: { populate: { background: true } } },
      filters: {
        name: { $eqi: decodeURIComponent(brandParam) },
      },
    },
  }).then((res) => res.data?.[0]);

  if (!brand) {
    return notFound();
  }

  const hasBanner = banner?.title || banner?.background;

  return (
    <>
      {hasBanner && (
        <Transition transitionName="fadeInUp">
          <BannerBlock {...banner} logo={logo} />
        </Transition>
      )}

      <SearchContext
        indexName={"arkive:products"}
        configure={{
          hitsPerPage: 36,
          filters: `brand:=:"${brand.name}"`,
        }}
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
