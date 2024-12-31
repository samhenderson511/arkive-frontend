import { IconFileBroken } from "@tabler/icons-react";
import { Text } from "@/components";

export const ErrorLayout = ({
  icon: Icon = IconFileBroken,
  title = `500 - Something went wrong!`,
  message = "We're sorry, something went wrong. Please try again later. Our team has been notified of the issue.",
}) => (
  <div className={"px-4 py-32 flex flex-col text-center gap-6 items-center"}>
    <Icon className={"text-muted-foreground"} size={48} />
    <div className="flex flex-col items-center gap-3">
      <Text element="h1">{title}</Text>
      <p className={"text-center prose prose-sm dark:prose-invert"}>{message}</p>
    </div>
  </div>
);
