import { UiBannerCarousel } from "@/types";
import { Carousel } from "../ui/carousel";
import { BannerBlock } from "./banner-block";

export function BannerCarouselBlock({ slides }: UiBannerCarousel) {
  return (
    <Carousel
      items={slides.map((slide) => (
        <BannerBlock key={slide.title} {...slide} />
      ))}
      hideButtons
    />
  );
}
