import { Button } from "@/components/common";
import { ErrorLayout } from "@/components/layout/templates/error";
import { IconUnlink } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
};

export default function NotFound() {
  return (
    <ErrorLayout
      icon={IconUnlink}
      title="404 - This page couldn't be found!"
      message="We can't find the page you're looking for, but don't worry - it's probably just hanging out with the missing socks somewhere. While we go on a treasure hunt to find it, why not explore our collection of finds that definitely made it through the wash?"
      CTAs={
        <Button href={"/"} size={"lg"}>
          Go to homepage
        </Button>
      }
    />
  );
}
