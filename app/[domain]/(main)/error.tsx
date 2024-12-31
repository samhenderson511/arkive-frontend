"use client"; // Error components must be Client Components

import { Button } from "@/components";
import { ErrorLayout } from "@/components/layout/templates/error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorLayout
      CTAs={
        <>
          <Button size={"lg"} onClick={() => reset()}>
            Try again
          </Button>
          <Button href={"/"} variant={"link"}>
            Go home
          </Button>
        </>
      }
    />
  );
}
