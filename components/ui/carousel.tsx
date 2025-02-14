"use client";

import { cn } from "@/lib";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { default as Autoplay } from "embla-carousel-autoplay";
import { default as Fade } from "embla-carousel-fade";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import * as React from "react";
import { useCallback } from "react";
import { Button } from "./button";
import { Pagination } from "./pagination";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  items?: React.ReactNode[];
  children?: React.ReactNode;
  layout?: "fullscreen" | "padded";
  hideButtons?: boolean;
  hidePagination?: boolean;
  autoPlayDuration?: number;
  className?: string;
  transition?: "slide" | "fade" | "bounce";
  classNames?: {
    pagination?: string;
    carouselItem?: string;
    carouselContent?: string;
  };
  id?: string;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

function Carousel({
  items,
  layout = "fullscreen",
  hideButtons,
  hidePagination,
  opts,
  classNames,
  className,
  transition,
  autoPlayDuration = 0,
  children,
  id,
  ...rest
}: CarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);

  if (!items?.length && !children) {
    return null;
  }

  return (
    <div id={id} className={cn("flex z-[1] flex-col w-full justify-center", className)}>
      <CarouselRoot
        opts={{
          loop: true,
          duration: transition === "bounce" ? 10 : 20,
          ...opts,
        }}
        plugins={
          [
            autoPlayDuration ?
              Autoplay({
                delay: autoPlayDuration,
                stopOnInteraction: true,
              })
            : null,
            transition === "fade" ? Fade() : null,
          ].filter(Boolean) as React.ComponentProps<typeof CarouselRoot>["plugins"]
        }
        setApi={setApi}
        className={cn(layout === "padded" ? "pb-4 sm:pb-8" : "p-0", "w-full h-full relative")}
        {...rest}
      >
        <CarouselContent className={cn("h-full", classNames?.carouselContent)}>
          {items?.map((item, i) => (
            <CarouselItem className={classNames?.carouselItem} key={"carousel_" + i}>
              {item}
            </CarouselItem>
          ))}
          {children}
        </CarouselContent>

        {!hideButtons && scrollSnaps?.length > 1 && (
          <>
            <CarouselPrevious
              className={(layout === "padded" && "translate-y-1") || ""}
              size={"icon"}
              variant={"secondary"}
            />
            <CarouselNext
              className={(layout === "padded" && "translate-y-1") || ""}
              size={"icon"}
              variant={"secondary"}
            />
          </>
        )}
      </CarouselRoot>

      {!hidePagination && scrollSnaps?.length > 1 && (
        <div
          className={cn(
            layout === "padded" ? "-translate-y-2" : (
              "bottom-0 absolute p-4 sm:p-8 sm:px-7 px-3 text-white"
            ),
            "w-full z-10",
            classNames?.pagination
          )}
        >
          <Pagination
            hideButtons
            variant={"dots"}
            currentPage={selectedIndex + 1}
            totalPages={scrollSnaps.length}
            onPageChange={onDotButtonClick}
          />
        </div>
      )}
    </div>
  );
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (emblaApi: CarouselApi | undefined): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );
  const onInit = useCallback((emblaApi: CarouselApi) => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
    }
  }, []);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

const CarouselRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) {
      return;
    }

    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
CarouselRoot.displayName = "CarouselRoot";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden w-full h-full">
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4 sm:-ml-8" : "-mt-4 sm:-mt-8 flex-col",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 flex flex-col shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4 sm:pl-8" : "pt-4 sm:pt-8",
          className
        )}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & Pick<CarouselProps, "layout">
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "sm:flex hidden absolute rounded-full",
        orientation === "horizontal" ?
          "left-4 top-1/2 -translate-y-1/2"
        : "top-4 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <IconArrowLeft className="w-4 h-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & Pick<CarouselProps, "layout">
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "sm:flex hidden absolute rounded-full",
        orientation === "horizontal" ?
          "right-4 top-1/2 -translate-y-1/2"
        : "bottom-4 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <IconArrowRight className="w-4 h-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselRoot,
  type CarouselApi,
};
