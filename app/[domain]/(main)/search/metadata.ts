import { strapiFetch } from "@/lib/api";
import { getSeoData } from "@/lib/data/getSeoData";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { handleWithoutCategory } from "@/lib/util/handleWithoutCategory";
import { createMetaData } from "@/lib/util/createMetadata";
import { Metadata } from "next";
import { DepartmentPageProps } from "types/global";
import { BannerCategory } from "types/strapi";

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
  const { department, domain } = params;
  const { tab, handleAsParam } = await getCategoryFromDomain(domain);
  const data = await getSeoData("/[storeTab]/[department]");

  const handle = `/${handleAsParam}/${department}`.toUpperCase();

  const page: BannerCategory[] =
    (await strapiFetch({
      endpoint: "banner-categories",
      params: { "filters[Handle][$eq]": handle },
    })) || [];

  if (!data || !page) {
    return {};
  }

  const { BrandTitle } = tab;
  const { baseUrl, canonicalURL, description, imageData, keywords, title } = createMetaData({
    data: data,
    department,
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
      url: new URL(handleWithoutCategory(handle), baseUrl),
      images: [
        page?.[0]?.attributes?.CategoryBanner?.Background?.data?.[0]?.attributes?.url,
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
