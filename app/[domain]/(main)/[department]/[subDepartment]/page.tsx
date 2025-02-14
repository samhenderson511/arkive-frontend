import { getMarginClassNames } from "@/components/block-render";
import { BannerBlock } from "@/components/block-render/banner-block";
import { Transition } from "@/components/layout/transition";
import { DefaultResults } from "@/components/search/default-results";
import { SearchContext } from "@/components/search/search-context";
import { getSite, strapiQuery } from "@/lib/server";
import { ApiCategory } from "@/types";
import { notFound } from "next/navigation";

export async function generateStaticParams({ params: { domain } }: { params: { domain: string } }) {
  const site = await getSite(domain, {
    populate: {
      category: {
        populate: { children: true },
      },
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

  const params = subDepartments?.map(({ parent, name }) => ({
    domain: site.domain,
    department: parent.name.toLowerCase(),
    subDepartment: name.toLowerCase(),
  }));

  return params || [];
}

export default async function SubDepartment({
  params,
}: {
  params: Promise<{ domain: string; department: string; subDepartment: string }>;
}) {
  const { domain, department: departmentParam, subDepartment: subDepartmentParam } = await params;

  const site = await getSite(domain, {
    populate: { category: true },
  });

  if (!site) {
    return notFound();
  }

  const department = await strapiQuery<ApiCategory[]>({
    path: "categories",
    options: {
      filters: {
        name: { $eqi: decodeURIComponent(departmentParam) },
        parent: { name: { $eqi: site.category?.name } },
      },
    },
  }).then((res) => res.data?.[0]);

  if (!department) {
    return notFound();
  }

  const { banner, ...subDepartment } = await strapiQuery<ApiCategory[]>({
    path: "categories",
    options: {
      populate: { parent: true, banner: { populate: { background: true } } },
      filters: {
        name: { $eqi: decodeURIComponent(subDepartmentParam) },
        parent: { name: { $eqi: department.name } },
      },
    },
  }).then((res) => res.data?.[0]);

  const subDepartmentPath = `${site.category.name} > ${department.name} > ${subDepartment.name}`;
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
          filters: `categories.subDept:=:"${subDepartmentPath}"`,
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
