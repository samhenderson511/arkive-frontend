"use client";

import { cn } from "@/lib";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import {
  IconBrandFacebookFilled,
  IconBrandGithubFilled,
  IconBrandInstagram,
  IconBrandLinkedinFilled,
  IconBrandTiktokFilled,
  IconBrandWhatsappFilled,
  IconBrandXFilled,
  IconBrandYoutubeFilled,
  IconMailFilled,
  IconPhoneFilled,
} from "@tabler/icons-react";
import { Fragment } from "react";
import { Button, Tooltip, TooltipContent, TooltipProvider } from "../";

export interface Social {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youTube?: string;
  tikTok?: string;
  emailAddress?: string;
  phoneNumber?: string;
  linkedIn?: string;
  whatsApp?: string;
  github?: string;
}

export interface SocialIconsProps extends React.ComponentPropsWithoutRef<"ul"> {
  links: Social;
  orientation?: "horizontal" | "vertical";
  classNames?: {
    button?: string;
    icon?: string;
  };
}

export function SocialIcons({
  links,
  className,
  orientation = "horizontal",
  classNames,
}: SocialIconsProps) {
  const Wrapper = orientation === "vertical" ? Fragment : TooltipProvider;

  const socialIconMap = [
    {
      name: "Facebook",
      Icon: IconBrandFacebookFilled,
      link: links?.facebook,
    },
    {
      name: "Twitter",
      Icon: IconBrandXFilled,
      link: links?.twitter,
    },
    {
      name: "Instagram",
      Icon: IconBrandInstagram,
      link: links?.instagram,
    },
    {
      name: "YouTube",
      Icon: IconBrandYoutubeFilled,
      link: links?.youTube,
    },
    {
      name: "TikTok",
      Icon: IconBrandTiktokFilled,
      link: links?.tikTok,
    },
    {
      name: "LinkedIn",
      Icon: IconBrandLinkedinFilled,
      link: links?.linkedIn,
    },
    {
      name: "WhatsApp",
      Icon: IconBrandWhatsappFilled,
      link: links?.whatsApp,
    },
    {
      name: "GitHub",
      Icon: IconBrandGithubFilled,
      link: links?.github,
    },
    {
      name: links?.emailAddress,
      Icon: IconMailFilled,
      link: links?.emailAddress && `mailto:${links?.emailAddress}`,
    },
    {
      name: links?.phoneNumber,
      Icon: IconPhoneFilled,
      link: links?.phoneNumber && `tel:${links?.phoneNumber}`,
    },
  ];

  return (
    <Wrapper>
      <ul
        className={cn(
          "flex flex-wrap items-center",
          {
            "flex-col": orientation === "vertical",
            "gap-x-3": orientation === "horizontal",
          },
          className
        )}
      >
        {socialIconMap
          .filter((i) => i.link)
          ?.sort((a, b) => (a.name || "").localeCompare(b.name || ""))
          .map(({ name, Icon, link }) => {
            const component = (
              <Button
                href={link}
                aria-label={name}
                target={link?.includes("mailto:") || link?.includes("tel:") ? "_self" : "_blank"}
                variant={orientation === "vertical" ? "link" : "ghost"}
                size={orientation === "vertical" ? "sm" : "smIcon"}
                className={cn(
                  "gap-3 p-2",
                  {
                    "w-0 grow truncate overflow-hidden justify-start": orientation === "vertical",
                  },
                  classNames?.button
                )}
              >
                <Icon className="shrink-0" size={20} />
                {orientation === "vertical" && (
                  <span className="overflow-hidden w-0 truncate grow">{name}</span>
                )}
              </Button>
            );

            if (orientation === "horizontal") {
              return (
                <li key={name}>
                  <Tooltip>
                    <TooltipContent>{name}</TooltipContent>
                    <TooltipTrigger asChild>{component}</TooltipTrigger>
                  </Tooltip>
                </li>
              );
            } else {
              return (
                <li key={name} className="flex w-full">
                  {component}
                </li>
              );
            }
          })}
      </ul>
    </Wrapper>
  );
}
