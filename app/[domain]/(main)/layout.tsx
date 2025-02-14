import {
  BottomNavigation,
  CartSheet,
  MobileNavigation,
  NavigationSheet,
  SearchSheet,
  TopNavigation,
} from "@/components";
import { Transition } from "@/components/layout/transition";
import { AnnouncementBar, Footer } from "@/components/server";
import { NestedRepeaterLink } from "@/lib";
import { getSite, strapiQuery, toTitleCase } from "@/lib/server";
import { ApiBrand, ApiCategory, ApiSite } from "@/types";
import { notFound } from "next/navigation";

export default async function PageLayout({
  children,
  params,
}: {
  params: Promise<{ domain: string }>;
  children: React.ReactNode;
}) {
  const { domain } = await params;

  const site = await getSite(domain, {
    populate: {
      logo: true,
      category: {
        populate: {
          children: true,
        },
      },
      announcements: true,
    },
  });

  if (!site) {
    return notFound();
  }

  const logo = {
    src: site.logo.url || "",
    alt: site.logo.alternativeText || "",
    width: site.logo.width || 0,
    height: site.logo.height || 0,
  };

  const { data: sites } = await strapiQuery<ApiSite[]>({
    path: "sites",
    options: {
      fields: ["name", "domain"],
      populate: { logo: true, category: { fields: ["name"] } },
    },
  });

  const { data: departments } = await strapiQuery<ApiCategory[]>({
    path: "categories",
    options: {
      populate: { children: true },
      filters: {
        parent: {
          documentId: { $eq: site.category?.documentId },
        },
        products: {
          variants: {
            stock: { $gt: 0 },
          },
        },
      },
    },
  });

  const { data: subDepartments } = await strapiQuery<ApiCategory[]>({
    path: "categories",
    options: {
      populate: { parent: true },
      filters: {
        parent: { documentId: { $in: departments?.map(({ documentId }) => documentId) } },
        products: {
          variants: {
            stock: {
              $gt: 0,
            },
          },
        },
      },
    },
  });

  const { data: brands } = await strapiQuery<ApiBrand[]>({
    path: "brands",
    options: {
      populate: { logo: true },
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

  const links: NestedRepeaterLink[] = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Sale",
      url: "/sale",
    },
    {
      label: "New Arrivals",
      url: "/new-arrivals",
    },
    {
      label: "Brands",
      url: "/brands",
      subMenu: brands?.map(({ name, logo }) => ({ label: name, url: `/brands/${name}`, logo })),
    },
    ...departments?.map(({ name, documentId }) => ({
      label: toTitleCase(name),
      url: `/${name}`,
      subMenu: subDepartments
        .filter(({ parent }) => parent?.documentId === documentId)
        .map(({ name, parent }) => ({
          label: toTitleCase(name),
          url: `/${parent?.name}/${name}`,
        })),
    })),
  ];

  const categories = [...departments, ...subDepartments];

  const announcementBarHeight = Boolean(site.announcements.length) ? 48 : 0;
  const topNavigationHeight = 48;

  return (
    <>
      <AnnouncementBar announcements={site.announcements} />

      <TopNavigation sites={sites} site={site} />
      <BottomNavigation
        links={links}
        scrollThreshold={topNavigationHeight + announcementBarHeight}
        logo={logo}
      />

      <main className="grow flex flex-col items-center gap-8 lg:gap-16 pb-8 lg:pb-16">
        {children}
      </main>

      <Transition transitionName="fadeInUp">
        <MobileNavigation />
      </Transition>

      <Transition transitionName="fadeInUp" waitForInView>
        <Footer site={site} />
      </Transition>

      <CartSheet />
      <SearchSheet categories={categories} brands={brands} rootCategory={site.category.name} />
      <NavigationSheet links={links} />
    </>
  );
}
