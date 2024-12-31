import { Button } from "@/components/common";
import { Input } from "@/components/common/input";

const Subscribe = () => (
  <div className={"flex flex-col sm:flex-row gap-3 items-stretch w-full md:w-[28rem]"}>
    <Input name={"subscribe"} className={"grow"} label={"Email Address"} />
    <Button className={"sm:h-auto !w-full sm:!w-auto shrink-0"} size={"lg"}>
      Subscribe
    </Button>
  </div>
);

export { Subscribe };
