import { Theme } from "@/components/layout/theme";
import { getSite } from "@/lib/data/get-site";
import { strapiQuery } from "@/lib/strapi-query";
import { ApiSite } from "@/types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const domains = await strapiQuery<ApiSite[]>({
    path: "sites",
    options: {
      populate: {
        category: {
          fields: ["name"],
        },
      },
    },
  });

  const params = domains?.data?.map(({ category }) => ({
    domain: encodeURIComponent(category.name).toLowerCase(),
  }));

  return params || [];
}

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;

  const site = await getSite(domain, {
    populate: { seo: true, logo: true, favicon: true, appleTouchIcon: true },
  });

  if (!site) return {};

  const { description, images, keywords, title } = site.seo;

  return {
    title: { template: `%s | ${title}`, absolute: title || "" },
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: domain,
      images,
      locale: "en_GB",
      type: "website",
    },
    icons: {
      icon: site.favicon?.url,
      shortcut: site.favicon?.url,
      apple: site.appleTouchIcon?.url,
    },
    metadataBase: new URL(`https://${site.domain}`),
    applicationName: title,
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title,
    },
    category: "Fashion",
    classification: "Fashion",
    creator: "Sam Henderson",
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
      url: true,
    },
  };
}

export default async function DomainLayout({
  params,
  children,
}: {
  params: Promise<{ domain: string }>;
  children: React.ReactNode;
}) {
  const { domain } = await params;

  const site = await getSite(domain);

  if (!site) return notFound();

  return <Theme site={site}>{children}</Theme>;
}

export const dynamicParams = true;
