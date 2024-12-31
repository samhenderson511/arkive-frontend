import { Alert, AlertTitle } from "@/components/common/alert";

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
