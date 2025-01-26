import { UiBannerCarousel } from "@/types";
import { Carousel } from "../ui/carousel";
import { BannerBlock } from "./banner-block";

export function BannerCarouselBlock({
  slides,
  className,
}: UiBannerCarousel & { className?: string }) {
  return (
    <Carousel
      className={className}
      autoPlayDuration={4000}
      classNames={{
        carouselItem: "pl-0 sm:pl-0",
        carouselContent: "ml-0 sm:ml-0",
        pagination: "[&>div]:justify-start",
      }}
      items={slides?.map((slide) => <BannerBlock key={slide.title} {...slide} />)}
      hideButtons
    />
  );
}
