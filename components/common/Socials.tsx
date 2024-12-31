import { Button, Tooltip } from "@/components/common";
import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";

export const Socials = ({ facebook, instagram, twitter }) => (
  <>
    {instagram && (
      <Tooltip content={"Instagram"}>
        <Button variant={"ghost"} size={"icon"} href={instagram} title={"Instagram"}>
          <IconBrandInstagram size={24} />
        </Button>
      </Tooltip>
    )}
    {facebook && (
      <Tooltip content={"Facebook"}>
        <Button variant={"ghost"} size={"icon"} href={facebook} title={"Facebook"}>
          <IconBrandFacebook size={24} />
        </Button>
      </Tooltip>
    )}
    {twitter && (
      <Tooltip content={"Twitter"}>
        <Button variant={"ghost"} size={"icon"} href={twitter} title={"Twitter"}>
          <IconBrandX size={24} />
        </Button>
      </Tooltip>
    )}
  </>
);
