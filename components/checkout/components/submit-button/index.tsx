"use client";

import { Button } from "@/components/common";
import { IconLoader2 } from "@tabler/icons-react";
import { track } from "@vercel/analytics";
import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  variant,
  className,
}: {
  children: React.ReactNode;
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      size="lg"
      onClick={() => track("Form Submission", { formAction: children.toString() })}
      className={className}
      type="submit"
      variant={variant}
      disabled={pending}
    >
      {pending && <IconLoader2 className="mr-3 animate-spin" />}
      {children}
    </Button>
  );
}
