import { Logo, Socials } from "@/components/common";
import Image from "next/image";
import { StoreTab } from "types/strapi";

interface Props {
  currentTab: StoreTab;
}

export const SiteInfo = ({ currentTab }: Props) => (
  <div className="flex flex-col items-start justify-center gap-6">
    <Logo className={"!max-h-16 h-max !max-w-48"} logo={currentTab.attributes.Logo.data} />
    <div
      className={"prose-sm prose dark:prose-invert"}
      dangerouslySetInnerHTML={{
        __html: currentTab?.attributes.FooterSeoText,
      }}
    />
    <div className={"flex gap-3 -mt-2"}>
      <Socials
        facebook={currentTab.attributes.FaceBook}
        instagram={currentTab.attributes.Instagram}
        twitter={currentTab.attributes.Twitter}
      />
    </div>
    <div className={"!relative flex h-8"}>
      <Image
        src={"/payment-providers.svg"}
        className={"!relative flex"}
        fill
        alt={"Payment Providers"}
      />
    </div>
  </div>
);
