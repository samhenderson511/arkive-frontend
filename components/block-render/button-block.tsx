import { UiButton } from "../../types/strapi/components";
import { Button, ButtonProps } from "../ui/button";

export async function ButtonBlock({ className, ...data }: UiButton & { className?: string }) {
  const sizeMap: Record<UiButton["size"], ButtonProps["size"]> = {
    Small: "sm",
    Default: "default",
    Large: "lg",
  };

  const variantMap: Record<UiButton["variant"], ButtonProps["variant"]> = {
    Primary: "default",
    Secondary: "secondary",
    Outline: "outline",
    Ghost: "ghost",
    Link: "link",
  };

  return (
    <Button
      className={className}
      href={data.href}
      size={sizeMap[data.size]}
      variant={variantMap[data.variant]}
    >
      {data.children}
    </Button>
  );
}
