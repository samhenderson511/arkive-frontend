import { Button, Text } from "@/components";
import { Fragment } from "react";

interface Props {
  title: string;
  items: { href: string; label: string }[][];
}

export const Column = ({ title, items }: Props) => (
  <div className={"flex flex-col gap-4"}>
    <Text element="h4" className="font-semibold">
      {title}
    </Text>

    <nav>
      <ul className={"flex flex-col"}>
        {items?.filter(Boolean)?.map((group, i) => (
          <Fragment key={`${group?.[0]?.href}-${i}`}>
            {i !== 0 && <hr className={"border-border my-2 w-full border-px"} />}
            {group?.filter(Boolean)?.map((item) => (
              <li key={item.href}>
                <Button href={`/${item.href}`} size={"sm"} className="px-0" variant={"link"}>
                  {item.label}
                </Button>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
    </nav>
  </div>
);
