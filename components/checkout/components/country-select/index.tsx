import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common";
import type { Region } from "@medusajs/client-types";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

const CountrySelect = forwardRef<
  HTMLSelectElement,
  React.ComponentProps<typeof Select> & {
    region?: Region;
  }
>(({ region, defaultValue, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  );

  const countryOptions = useMemo(() => {
    if (!region) {
      return [];
    }

    return region.countries.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    }));
  }, [region]);

  return (
    <Select defaultValue={countryOptions?.[0]?.value} {...props}>
      <SelectTrigger>
        <SelectValue placeholder={"Country"} />
      </SelectTrigger>
      <SelectContent>
        {countryOptions?.map(({ value, label }, index) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

CountrySelect.displayName = "CountrySelect";

export default CountrySelect;
