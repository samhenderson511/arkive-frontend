import { BlockRender } from "@/components/block-render";
import { BannerCarouselBlock } from "@/components/block-render/banner-carousel-block";
import { getSite } from "@/lib/server";
import { notFound } from "next/navigation";

export default async function Home(props: { params: Promise<{ domain: string }> }) {
  const { domain } = await props.params;

  const site = await getSite(domain, {
    populate: {
      heroBanner: {
        populate: {
          slides: {
            populate: "*",
          },
        },
      },
      category: {
        fields: ["documentId"],
      },
      content: {
        on: {
          "ui.card": {
            populate: "*",
          },
          "ui.grid-tiles": {
            populate: {
              tiles: {
                populate: "*",
              },
              design: {
                populate: "*",
              },
            },
          },
          "ui.button": {
            populate: "*",
          },
          "ui.blocks": {
            populate: "*",
          },
          "ui.banner": {
            populate: "*",
          },
          "ui.products-carousel": {
            populate: "*",
          },
          "ui.categories": {
            populate: "*",
          },
          "ui.brands": {
            populate: "*",
          },
        },
      },
    },
  });

  if (!site) {
    return notFound();
  }

  return (
    <>
      <BannerCarouselBlock slides={site.heroBanner?.slides} height="large" />

      <BlockRender site={site} dynamicZone={site.content} />
    </>
  );
}
