import { Button, TitleBar } from "@/components/ui";
import { strapiFetch } from "@/lib/api";
import { RichTextPage } from "types/strapi";

export default async function Support() {
  const pages: RichTextPage[] = await strapiFetch({
    endpoint: "rich-text-pages",
    depth: 0,
  });

  return (
    <div className={"flex justify-center  bg-card"}>
      <div className={"max-w-screen-2xl w-full items-center flex flex-col gap-8"}>
        <TitleBar title={"Customer Support"} background={null} />
        <div className={"p-4 sm:p-8 pt-0 flex w-full"}>
          <section
            className={
              "rounded-sm p-4 sm:px-8 py-16 border-border w-full justify-center border flex bg-background"
            }
          >
            <div className={"flex flex-wrap justify-center gap-4 lg:gap-8"}>
              {pages.map((page) => (
                <Button
                  key={page.id}
                  variant={"outline"}
                  className="border border-border !p-5 rounded-sm hover:border !size-64 flex flex-col !items-start justify-between"
                  href={`/support/${page.attributes.PageSlug}`}
                >
                  <h2 className="text-sm font-semibold capitalize">{page.attributes.PageTitle}</h2>
                </Button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
