import { Alert } from "@/components/common/alert";
import { Button } from "@/components/common/button";

const SignInPrompt = () => {
  return (
    <Alert className={"mb-3"}>
      <h2 className={"grow"}>
        Sign in or create an account for a more personalised shopping experience
      </h2>
      <Button href="/account" className={"border-info-foreground/25 shrink-0"} variant={"outline"}>
        Sign in
      </Button>
    </Alert>
  );
};

export default SignInPrompt;
