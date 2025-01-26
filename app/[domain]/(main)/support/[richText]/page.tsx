import { TitleBar } from "@/components/ui";
import { strapiFetch } from "@/lib/api";
import { convertToHtml } from "@/lib/util/convertToHtml";
import { notFound } from "next/navigation";
import { type RichTextPage } from "types/strapi";

export async function generateStaticParams() {
  const pages: RichTextPage[] = await strapiFetch({
    endpoint: "rich-text-pages",
    depth: 0,
  });

  return pages.map((page) => ({
    richText: page.attributes.PageSlug,
  }));
}

export default async function RichTextPage(props: { params: Promise<{ richText: string }> }) {
  const params = await props.params;
  const pageData: RichTextPage[] = await strapiFetch({
    endpoint: "rich-text-pages",
    params: {
      "filters[PageSlug][$eqi]": params.richText,
      "fields[0]": "PageTitle",
      "fields[1]": "PageContent",
    },
  });

  const page = pageData?.[0]?.attributes;
  if (!page) {
    return notFound();
  }
  const pageContent = convertToHtml(page?.PageContent);

  return (
    <div className={"flex justify-center  bg-card"}>
      <div className={"max-w-screen-2xl w-full items-center flex flex-col gap-8"}>
        <TitleBar title={page?.PageTitle} background={page?.HeroBanner?.data} />
        <div className={"p-8 pt-0 flex w-full"}>
          <article
            className={
              "rounded-sm px-8 py-16 border-border w-full justify-center border flex bg-background"
            }
          >
            <div
              className={"prose prose-sm dark:prose-invert max-w-5xl"}
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}

export const dynamicParams = true;
