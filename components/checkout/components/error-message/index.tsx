import { Alert, AlertTitle } from "@/components/ui/alert/index";

const ErrorMessage = ({ error }: { error?: string | null }) => {
  if (!error) {
    return null;
  }

  return (
    <Alert variant={"destructive"}>
      <AlertTitle>{error}</AlertTitle>
    </Alert>
  );
};

export default ErrorMessage;
