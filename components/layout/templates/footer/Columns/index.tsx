import { Button } from "@/components/common";
import { barlow } from "app/fonts";
import clsx from "clsx";
import { toLower } from "lodash";
import { Fragment } from "react";

interface Props {
  title: string;
  items: { href: string; label: string }[][];
}

export const Column = ({ title, items }: Props) => (
  <div className={"flex flex-col gap-4"}>
    <h4 className={clsx(barlow.className, "text-3xl uppercase")}>{title}</h4>
    <nav>
      <ul className={"flex flex-col"}>
        {items.map((group, i) => (
          <Fragment key={group[0].href}>
            {i !== 0 && <hr className={"border-border my-2 w-full border-px"} />}
            {group.map((item) => (
              <li key={item.href}>
                <Button href={toLower(item.href)} size={"sm"} variant={"link"}>
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

export * from "./1";
export * from "./2";
export * from "./3";
export * from "./SiteInfo";
