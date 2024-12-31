import { splitAtFirstWord } from "@/lib/util/splitAtFirstWord";
import { barlowCon } from "app/fonts";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { BannerHero } from "types/strapi";

interface Props {
  slide: BannerHero;
  i: number;
}

export const Slide = ({ slide, i }: Props) => {
  const { Title, Background, Description } = slide.attributes.HeroBanner;
  const [firstWord, rest] = splitAtFirstWord(Title);

  return (
    <Link
      href={slide.attributes?.Link || ""}
      className={clsx(
        "h-96 flex md:h-[calc(100svh-7.5rem)] lg:h-[calc(80svh-7.5rem)] w-full relative dark",
        { "pointer-events-none": !slide.attributes?.Link }
      )}
    >
      <div className="absolute inset-0 z-10 flex justify-center p-8 py-24 text-foreground lg:py-32 bg-background/60">
        <div className={"flex h-full w-full flex-col items-start justify-end max-w-8xl"}>
          <h1
            className={clsx(
              barlowCon.className,
              "mb-4 text-[min(14vw,7rem)] leading-none font-bold uppercase"
            )}
          >
            <span className="text-transparent text-[calc(min(14vw,7rem)-1px)] text-outline shadow-foreground">
              {firstWord}
            </span>{" "}
            <span>{rest}</span>
          </h1>
          <p className="prose prose-lg prose-invert drop-shadow-md shadow-black">{Description}</p>
        </div>
      </div>
      {Background?.data?.[0]?.attributes?.url && (
        <Image
          src={Background.data[0].attributes.url}
          loading="eager"
          priority={i === 0}
          alt={Background.data[0].attributes.alternativeText || Title}
          className="absolute inset-0 object-cover"
          draggable="false"
          placeholder={Background.data[0].attributes.blurDataUrl ? "blur" : "empty"}
          blurDataURL={Background.data[0].attributes.blurDataUrl}
          fill
          sizes="100vw"
        />
      )}
    </Link>
  );
};
