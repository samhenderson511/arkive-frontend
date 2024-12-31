"use client"

import { useRef } from "react"
import { Swiper as SwiperType } from "swiper"
import { Autoplay, Pagination, Keyboard, Mousewheel } from "swiper/modules"
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import { BannerHero } from "types/strapi"
import { Slide } from "./slide"

interface Props {
  slides: BannerHero[]
}

const Hero = ({ slides }: Props) => {
  const swiperRef = useRef<SwiperType>()

  const pagination: SwiperProps["pagination"] = {
    clickable: true,
    el: ".custom-pagination",
    bulletClass:
      "w-10 flex items-center py-3 cursor-pointer transition duration-300 ease-out origin-left text-foreground/50",
    bulletActiveClass: "!text-foreground/100",
    renderBullet: function (index, className) {
      return `<div class="dark ${className}">
        <span class="h-0.5 flex-1 bg-current"></span>
      </div>`
    },
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={8}
      modules={[Autoplay, Pagination, Keyboard, Mousewheel]}
      autoplay={{
        delay: 6000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      pagination={pagination}
      keyboard={{ enabled: true }}
      mousewheel={{ forceToAxis: true }}
      loop={true}
      className={"w-full relative !flex justify-center"}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper
      }}
    >
      {slides?.map((slide, i) => (
        <SwiperSlide
          key={String(slide.attributes.createdAt)}
          className={"!h-auto flex w-full items-stretch select-none"}
        >
          <Slide slide={slide} i={i} />
        </SwiperSlide>
      ))}
      <div className="absolute z-10 flex justify-center px-8 w-full lg:!bottom-[3.5rem] !bottom-10">
        <div className="flex justify-start w-full custom-pagination gap-3 max-w-8xl" />
      </div>
    </Swiper>
  )
}

export { Hero }
