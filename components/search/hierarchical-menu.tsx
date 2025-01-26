"use client";

import clsx from "clsx";
import { useHierarchicalMenu } from "react-instantsearch";
import { Label } from "../form/label";
import { Badge } from "../ui/badge";
import { Text } from "../ui/text";

export function HierarchicalMenu({
  items,
  refine,
  className,
}: Partial<ReturnType<typeof useHierarchicalMenu>> & { className?: string }) {
  if (!items || !refine) return null;

  return (
    <ul className={clsx("flex flex-col gap-1", className)}>
      {items?.map((item) => (
        <li key={item.value} className="flex flex-col gap-1">
          <Label
            onClick={() => refine(item.value)}
            className="flex text-muted-foreground items-center gap-3"
          >
            <Text element="span" className={clsx("grow capitalize", item.isRefined && "font-bold")}>
              {item.label.toLowerCase()}
            </Text>
            <Badge className="text-muted-foreground" variant="secondary">
              {item.count}
            </Badge>
          </Label>

          {Boolean(item.data?.length) && (
            <HierarchicalMenu
              className="pl-6 border-l border-border"
              items={item.data!}
              refine={refine}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
