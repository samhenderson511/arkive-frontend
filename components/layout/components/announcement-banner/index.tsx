"use client";

import { Button } from "@/components/common";
import { convertToHtml } from "@/lib/util/convertToHtml";
import { IconX } from "@tabler/icons-react";
import { StoreTab } from "types/strapi";
import { handleHide } from "./handleSubmit";

import { useEffect, useState } from "react";

export const AnnouncementBanner = ({
  announcements,
  cookie,
}: {
  announcements: StoreTab["attributes"]["Announcements"];
  cookie: { value: string };
}) => {
  const [hidden, setHidden] = useState(cookie?.value === "true");
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prevAnnouncement) => (prevAnnouncement + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [announcements]);

  if (!announcements?.length) {
    return null;
  }

  const content = convertToHtml(announcements[currentAnnouncement].AnnouncementContent);

  return hidden ? null : (
      <div className="bg-info-foreground py-2.5 fixed bottom-14 w-full z-50 px-8 lg:bottom-0 lg:relative transition duration-200 ease-out overflow-hidden text-info text-sm font-medium text-center flex items-center justify-center">
        <div key={content} dangerouslySetInnerHTML={{ __html: content }} />
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={async () => {
            setHidden(true), handleHide();
          }}
          className="absolute right-2 w-8 h-8"
        >
          <IconX size={16} />
        </Button>
      </div>
    );
};

export default AnnouncementBanner;
