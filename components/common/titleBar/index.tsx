import { blurhash } from "@/lib/util/blurhash";
import { barlowCon } from "app/fonts";
import clsx from "clsx";
import Image from "next/image";
import { Media } from "types/strapi";
import { Logo } from "..";

type Props = {
  background: Media;
  title: string;
  description?: string;
  logo?: Media;
  showLogo?: boolean;
};

export async function TitleBar({ background, description, title, logo, showLogo }: Props) {
  const blurDataURL = await blurhash({
    image: background?.attributes?.blurhash,
  });

  return (
    <div className={"flex p-1.5 lg:p-3 pb-0 w-full justify-center"}>
      <div className="relative flex items-center justify-center flex-1 w-full px-6 py-8 overflow-hidden rounded-sm sm:p-8 max-w-8xl dark bg-muted text-foreground">
        <div className={"flex-col gap-4 w-full flex z-20"}>
          {showLogo && logo && <Logo logo={logo} className={"h-auto !max-w-[10rem] pt-4"} />}
          <h1
            className={clsx(
              barlowCon.className,
              !description && "pt-2",
              showLogo ? "text-[min(9vw,3rem)]" : "text-[min(12vw,4rem)]",
              "uppercase leading-none font-bold"
            )}
          >
            {title}
          </h1>
          <p className={"prose prose-sm max-w-5xl dark:prose-invert"}>{description}</p>
        </div>
        <div className={"bg-background/75 absolute inset-0 z-10"} />
        {background && (
          <Image
            fill
            className={"object-cover z-[5]"}
            sizes={"100vw"}
            priority
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
            src={background?.attributes?.url}
            alt={background?.attributes?.alternativeText || title}
          />
        )}
        {logo && (
          <Logo
            className={"h-auto !absolute text-muted-foreground -left-16 z-0 !max-w-xl w-full"}
            logo={logo}
          />
        )}
      </div>
    </div>
  );
}
