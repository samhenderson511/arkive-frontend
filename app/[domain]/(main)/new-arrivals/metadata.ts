import { getSeoData } from "@/lib/data/getSeoData";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { createMetaData } from "@/lib/util/createMetadata";
import { Metadata } from "next";
import { StoreTabPageProps } from "types/global";

export async function generateMetadata({ params }: StoreTabPageProps): Promise<Metadata> {
  const { domain } = params;
  const { tab } = await getCategoryFromDomain(domain);
  const data = await getSeoData("/[storeTab]/new-arrivals");

  if (!tab || !data) {
    return {};
  }

  const { BrandTitle } = tab;
  const { baseUrl, canonicalURL, description, imageData, keywords, title } = createMetaData({
    data: data,
    storeTab: { attributes: tab, id: 0 },
  });
  const image = imageData?.data?.attributes;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: new URL(`/new-arrivals`, baseUrl),
      images: [
        tab.NewArrivalsPageBanner?.Background?.data[0].attributes.url,
        { url: image?.url, width: image?.width, height: image?.height },
      ],
      siteName: BrandTitle,
      locale: "en_GB",
      type: "website",
    },
    alternates: {
      canonical: canonicalURL,
    },
  };
}
