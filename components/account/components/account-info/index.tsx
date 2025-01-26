import { Button } from "@/components/ui";
import { Alert } from "@/components/ui/alert/index";
import useToggleState from "@/lib/hooks/use-toggle-state";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IconLoader2 } from "@tabler/icons-react";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

type AccountInfoProps = {
  label: string;
  currentInfo: string | React.ReactNode;
  isSuccess?: boolean;
  isError?: boolean;
  errorMessage?: string;
  clearState: () => void;
  children?: React.ReactNode;
};

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "An error occurred, please try again",
  children,
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState();
  const [parent] = useAutoAnimate();
  const { pending } = useFormStatus();

  const handleToggle = () => {
    clearState();
    setTimeout(() => toggle(), 100);
  };

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess, close]);

  return (
    <div className={"flex flex-col gap-3"} ref={parent}>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{label}</span>
          <div className="flex items-center justify-end flex-1 basis-0 gap-x-4">
            {typeof currentInfo === "string" ?
              <span className="text-muted-foreground">{currentInfo}</span>
            : currentInfo}
          </div>
        </div>
        <div>
          <Button
            variant="link"
            onClick={handleToggle}
            className={"-translate-y-2"}
            type={state ? "reset" : "button"}
          >
            {state ? "Cancel" : "Edit"}
          </Button>
        </div>
      </div>

      {/* Success state */}
      {isSuccess && <Alert variant={"success"}>{label} updated successfully</Alert>}

      {/* Error state  */}
      {isError && <Alert variant={"destructive"}>{errorMessage}</Alert>}

      {state && (
        <div className="flex flex-col gap-y-3">
          <div>{children}</div>
          <div className="flex items-center justify-end">
            <Button disabled={pending} type="submit">
              {pending && <IconLoader2 className="animate-spin" size={20} />}
              Save changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
