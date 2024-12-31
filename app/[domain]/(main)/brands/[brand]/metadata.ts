import { strapiFetch } from "@/lib/api";
import { getSeoData } from "@/lib/data/getSeoData";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { createMetaData } from "@/lib/util/createMetadata";
import { Metadata } from "next";
import { BrandPageProps } from "types/global";
import { BannerBrand } from "types/strapi";

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { domain, brand: slugifiedBrand } = params;
  const brand = slugifiedBrand.replace("-", " ");

  const { tab, handleAsParam } = await getCategoryFromDomain(domain);
  const data = await getSeoData("/[storeTab]/brands/[brand]");

  const page: BannerBrand[] = await strapiFetch({
    endpoint: "banner-brands",
    params: { "filters[BrandBanner][Title][$eqi]": brand },
    depth: 4,
  });

  if (!data || !page) {
    return {};
  }

  const { BrandTitle } = tab;
  const { baseUrl, canonicalURL, description, imageData, keywords, title } = createMetaData({
    data: data,
    storeTab: { attributes: tab, id: 0 },
    brand,
  });
  const image = imageData?.data?.attributes;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: new URL(`/${handleAsParam}/brands/${brand}`, baseUrl),
      images: [
        page[0]?.attributes.BrandBanner.Background.data?.[0]?.attributes.url,
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
