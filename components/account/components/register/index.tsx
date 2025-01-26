"use client";

import { useFormState } from "react-dom";

import { LOGIN_VIEW } from "@/components/account/templates/login-template";
import ErrorMessage from "@/components/checkout/components/error-message";
import { SubmitButton } from "@/components/checkout/components/submit-button";
import { Button, Input } from "@/components/ui";
import { signUp } from "@/lib/data";
import { barlow } from "app/fonts";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signUp, null);

  return (
    <div className="flex flex-col items-center w-full max-w-md gap-4">
      <h1 className={clsx(barlow.className, "uppercase text-3xl")}>Create your account</h1>
      <p className="text-center prose prose-sm dark:prose-invert">
        Create your Arkive Account, for a more personalised shopping experience.
      </p>
      <form className="flex flex-col w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input label="First name" name="first_name" required autoComplete="given-name" />
          <Input label="Last name" name="last_name" required autoComplete="family-name" />
          <Input label="Email" name="email" required type="email" autoComplete="email" />
          <Input label="Phone" name="phone" type="tel" autoComplete="tel" />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
          />
        </div>
        <ErrorMessage error={message} />

        <span className="mt-6 text-xs text-center text-muted-foreground">
          By creating an account, you agree to our{" "}
          <Link href="/support/privacy-policy" className="underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/support/terms-and-conditions" className="underline">
            Terms of Use
          </Link>
          .
        </span>
        <SubmitButton className="w-full mt-6">Join</SubmitButton>
      </form>
      <span className="flex flex-wrap items-baseline prose gap-1 prose-sm dark:prose-invert">
        Already a member?{" "}
        <Button onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)} variant="link">
          Sign in here
        </Button>
      </span>
    </div>
  );
};

export default Register;
