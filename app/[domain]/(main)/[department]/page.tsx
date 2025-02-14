import { SearchContext } from "@/components";
import { getMarginClassNames } from "@/components/block-render";
import { BannerBlock } from "@/components/block-render/banner-block";
import { Transition } from "@/components/layout/transition";
import { DefaultResults } from "@/components/search/default-results";
import { getSite, strapiQuery } from "@/lib/server";
import { ApiCategory } from "@/types";
import { notFound } from "next/navigation";

export async function generateStaticParams({ params: { domain } }: { params: { domain: string } }) {
  const site = await getSite(domain, {
    populate: {
      category: true,
    },
  });

  if (!site) {
    return [];
  }

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

  const params = departments?.map((dep) => ({
    domain: site.domain,
    department: dep.name.toLowerCase(),
  }));

  return params || [];
}

export default async function Department({
  params,
}: {
  params: Promise<{ domain: string; department: string }>;
}) {
  const { domain, department: departmentParam } = await params;

  const site = await getSite(domain, {
    populate: { category: true },
  });

  if (!site) {
    return notFound();
  }

  const { banner, ...department } = await strapiQuery<ApiCategory[]>({
    path: "categories",
    options: {
      populate: { parent: true, banner: { populate: { background: true } } },
      filters: {
        name: { $eqi: decodeURIComponent(departmentParam) },
        parent: { name: { $eqi: site.category?.name } },
      },
    },
  }).then((res) => res.data?.[0]);

  if (!department) {
    return notFound();
  }

  const departmentPath = `${site.category.name} > ${department.name}`;
  const hasBanner = banner?.title || banner?.background;

  return (
    <>
      {hasBanner && (
        <Transition transitionName="fadeInUp">
          <BannerBlock {...banner} />
        </Transition>
      )}

      <SearchContext
        indexName={"arkive:products"}
        configure={{
          hitsPerPage: 36,
          filters: `categories.dept:=:${departmentPath}`,
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
