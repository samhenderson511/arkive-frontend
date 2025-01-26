"use client";

import { cn } from "@/lib";
import { IconShirt } from "@tabler/icons-react";
import Image from "next/image";
import { ComponentProps, ComponentPropsWithRef, forwardRef } from "react";

type ThumbnailProps = {
  thumbnail?: string | null;
  blurDataURL?: string;
  alt: string;
  sizes?: string;
  size?: "small" | "medium" | "large" | "full";
} & ComponentProps<"div">;

const Thumbnail = forwardRef<ComponentPropsWithRef<typeof Thumbnail>, ThumbnailProps>(
  ({ thumbnail, sizes, alt, size = "small", blurDataURL, className, ...rest }, ref) => {
    const sizeMapping = {
      small: "180px",
      medium: "290px",
      large: "440px",
      full: "(min-width: 768px) 50vw, 100vw",
    };
    return (
      <div
        ref={ref}
        className={cn(
          "relative aspect-square bg-white",
          {
            "max-w-[180px]": size === "small",
            "max-w-[290px]": size === "medium",
            "max-w-[440px]": size === "large",
            "max-w-full": size === "full",
          },
          className
        )}
        {...rest}
      >
        {thumbnail ?
          <Image
            src={thumbnail}
            alt={alt}
            className="absolute inset-0 object-cover"
            draggable={false}
            fill
            sizes={sizes || sizeMapping[size]}
          />
        : <ThumbnailPlaceholder size={size} />}
      </div>
    );
  }
);

function ThumbnailPlaceholder({
  size = "small",
  className,
  ...rest
}: {
  size: ThumbnailProps["size"];
} & ComponentProps<"div">) {
  let iconSize;
  switch (size) {
    case "small":
      iconSize = 24;
      break;
    case "medium":
      iconSize = 36;
      break;
    case "large":
      iconSize = 48;
      break;
    default:
      iconSize = 64;
  }

  return (
    <div
      className={cn(
        "flex grow aspect-square items-center justify-center bg-muted text-muted-foreground",
        {
          "max-w-[180px]": size === "small",
          "max-w-[290px]": size === "medium",
          "max-w-[440px]": size === "large",
          "max-w-full": size === "full",
        },
        className
      )}
      {...rest}
    >
      <IconShirt size={iconSize} />
    </div>
  );
}

export { Thumbnail, ThumbnailPlaceholder };
