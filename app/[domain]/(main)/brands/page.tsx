import { getMarginClassNames } from "@/components/block-render";
import { BannerBlock } from "@/components/block-render/banner-block";
import { GridTilesBlock } from "@/components/block-render/grid-tiles-block";
import { Transition } from "@/components/layout/transition";
import { getSite, strapiQuery } from "@/lib/server";
import { ApiBrand } from "@/types";
import { notFound } from "next/navigation";
import slugify from "slugify";

export default async function Brands({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;

  const site = await getSite(decodeURIComponent(domain), {
    populate: { brandsBanner: { populate: { background: true } }, category: true },
  });

  if (!site) {
    return notFound();
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

  return (
    <>
      {(site.brandsBanner?.title || site.brandsBanner?.background) && (
        <Transition transitionName="fadeInUp">
          <BannerBlock {...site.brandsBanner} />
        </Transition>
      )}

      <Transition transitionName="fadeInUp" waitForInView>
        <GridTilesBlock
          className={getMarginClassNames({
            bottomMargin: "None",
            topMargin: "None",
          })}
          tiles={brands.map((brand) => ({
            title: brand.name,
            url: `/brands/${slugify(brand.name, { lower: true })}`,
            logo: brand.logo,
            background: brand.banner?.background,
          }))}
        />
      </Transition>
    </>
  );
}
