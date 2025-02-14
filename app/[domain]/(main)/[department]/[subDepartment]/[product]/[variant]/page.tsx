import { ProductPage } from "@/components/product/product-page";
import { getSite } from "@/lib/server";
import { constructHierarchy } from "@/lib/util/format-product";

export async function generateStaticParams({ params: { domain } }: { params: { domain: string } }) {
  const site = await getSite(domain, {
    populate: {
      category: {
        populate: {
          products: {
            filters: {
              variants: {
                stock: {
                  $gt: 0,
                },
              },
            },
            populate: {
              variants: {
                fields: ["name"],
              },
              categories: {
                populate: {
                  parent: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!site) {
    return [];
  }

  const params = site.category?.products?.flatMap((prod) => {
    const rootCategory = prod.categories?.find((cat) => !cat.parent);
    const {
      cat = "",
      dept = "",
      subDept = "",
    } = rootCategory ? constructHierarchy(rootCategory, prod) : {};

    return prod.variants.map((v) => ({
      domain: site.domain,
      department: dept?.split(cat)[1].replaceAll(" > ", "").toLowerCase(),
      subDepartment: subDept?.split(dept)[1].replaceAll(" > ", "").toLowerCase(),
      product: prod.name.toLowerCase(),
      variant: v.name.toLowerCase(),
    }));
  });

  console.log(params);

  return params || [];
}

export default async function Product({
  params,
}: {
  params: Promise<{
    domain: string;
    department: string;
    subDepartment: string;
    product: string;
    variant: string;
  }>;
}) {
  return <ProductPage params={params} />;
}
