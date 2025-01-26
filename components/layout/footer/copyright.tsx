import { Text } from "@/components";

export function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex py-2 flex-col items-center justify-center w-full gap-2 md:flex-row max-w-screen-2xl text-muted-foreground">
      <Text
        element="p"
        className="text-xs"
      >{`© ${currentYear} Arkive Clothing | Ozzy's Ltd, All rights reserved.`}</Text>
    </div>
  );
}
