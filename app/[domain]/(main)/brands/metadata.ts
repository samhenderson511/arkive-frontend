import { getSeoData } from "@/lib/data/getSeoData";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { createMetaData } from "@/lib/util/createMetadata";
import { Metadata } from "next";
import { StoreTabPageProps } from "types/global";

export async function generateMetadata({ params }: StoreTabPageProps): Promise<Metadata> {
  const { domain } = params;
  const { tab, handleAsParam } = await getCategoryFromDomain(domain);
  const data = await getSeoData("/[storeTab]/brands");

  if (!data || !tab) {
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
      url: new URL(`/${handleAsParam}/brands`, baseUrl),
      images: [
        tab?.BrandsPageBanner?.Background?.data[0]?.attributes?.url,
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
