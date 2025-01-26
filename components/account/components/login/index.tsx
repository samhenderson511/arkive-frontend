import { LOGIN_VIEW } from "@/components/account/templates/login-template";
import ErrorMessage from "@/components/checkout/components/error-message";
import { SubmitButton } from "@/components/checkout/components/submit-button";
import { Button, Input } from "@/components/ui";
import { logCustomerIn } from "@/lib/data";
import { barlow } from "app/fonts";
import clsx from "clsx";
import { useFormState } from "react-dom";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(logCustomerIn, null);

  return (
    <div className="flex flex-col items-center w-full max-w-md text-center gap-4">
      <h1 className={clsx(barlow.className, "uppercase text-3xl")}>Welcome back</h1>
      <p className="prose prose-sm dark:prose-invert">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <ErrorMessage error={message} />
        <SubmitButton className="w-full mt-6">Sign in</SubmitButton>
      </form>
      <span className="flex flex-wrap items-baseline prose gap-1 prose-sm dark:prose-invert">
        Don't have am account?{" "}
        <Button onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)} variant="link">
          Register here
        </Button>
      </span>
    </div>
  );
};

export default Login;
