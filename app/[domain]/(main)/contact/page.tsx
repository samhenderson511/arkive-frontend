import { ContactForm } from "@/components/ContactForm";
import { Button, Socials } from "@/components/ui";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { convertToHtml } from "@/lib/util/convertToHtml";
import { IconMail, IconPhone } from "@tabler/icons-react";
import { barlow } from "app/fonts";
import clsx from "clsx";
import { StoreTabPageProps } from "types/global";

export { generateMetadata } from "./metadata";

export default async function Contact(props: StoreTabPageProps) {
  const params = await props.params;
  const { tab } = await getCategoryFromDomain(params.domain);

  const pageContent = convertToHtml(tab?.ContactPageDescription);

  const options =
    tab.ContactEmail || tab.ContactNumber || tab.Instagram || tab.FaceBook || tab.Twitter;

  return (
    <div className={"flex justify-center p-8 py-12 bg-card"}>
      <div className={"max-w-screen-2xl w-full grid gap-8 grid-cols-1 lg:grid-cols-2"}>
        <section
          className={"rounded-sm px-8 py-16 border-border border flex flex-col gap-4 bg-background"}
        >
          <h1 className={clsx(barlow.className, "uppercase text-3xl")}>Contact Us</h1>
          {pageContent && (
            <div
              className={"prose prose-sm dark:prose-invert max-w-none"}
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          )}
          {options && (
            <div className={"flex flex-col"}>
              {tab.ContactEmail && (
                <Button variant={"link"} className={"gap-3"} href={`mailto:${tab.ContactEmail}`}>
                  <IconMail size={20} />
                  {tab.ContactEmail}
                </Button>
              )}
              {tab.ContactNumber && (
                <Button variant={"link"} className={"gap-3"} href={`tel:${tab.ContactNumber}`}>
                  <IconPhone size={20} />
                  {tab.ContactNumber}
                </Button>
              )}
              <hr className={"border-border w-8 my-4"} />
              <div className={"flex gap-3"}>
                <Socials facebook={tab.FaceBook} instagram={tab.Instagram} twitter={tab.Twitter} />
              </div>
            </div>
          )}
          <ContactForm />
        </section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8817.31706116672!2d-2.9679196!3d56.4620884!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48865ceba8bc3c19%3A0xe96b237771117291!2sArkive!5e0!3m2!1sen!2suk!4v1702744485476!5m2!1sen!2suk"
          className={"rounded-sm border border-border min-h-[90vw] lg:min-h-[24rem]"}
          width="100%"
          height="100%"
          loading="lazy"
        />
      </div>
    </div>
  );
}
