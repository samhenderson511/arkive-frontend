import { BlocksRenderer, Carousel } from "@/components";
import { RepeatableAnnouncement } from "@/types";
import { ReactNode } from "react";

export function AnnouncementWrapper({ children }: { children: ReactNode }) {
  // this is needed for the announcement banner to sit correctly with the navigation and be hidden on scroll
  return <div className="flex w-full -mb-8 sm:-mb-20">{children}</div>;
}

export function AnnouncementSlide({ content, backgroundColor, color }: RepeatableAnnouncement) {
  return (
    <div
      className="flex items-center justify-center w-full h-12 px-4 text-center select-none bg-accent text-accent-foreground"
      style={{ color, backgroundColor }}
    >
      <BlocksRenderer
        className="!max-w-screen-2xl !text-xs sm:!text-sm sm:!leading-tight line-clamp-2"
        content={content}
      />
    </div>
  );
}

export function AnnouncementBar({ announcements }: { announcements?: RepeatableAnnouncement[] }) {
  if (!announcements?.[0]?.content) return null;

  if (announcements?.length === 1) {
    return (
      <AnnouncementWrapper>
        <AnnouncementSlide {...announcements[0]} />
      </AnnouncementWrapper>
    );
  }

  return (
    <Carousel
      autoPlayDuration={3500}
      hideButtons
      hidePagination
      classNames={{
        carouselItem: "pl-0 sm:pl-0",
      }}
      items={announcements.filter(Boolean).map(({ backgroundColor, color, content }) => (
        <AnnouncementSlide {...{ backgroundColor, color, content }} />
      ))}
    />
  );
}
