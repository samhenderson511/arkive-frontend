"use client";

import { Button } from "@/components/ui/button";
import { IconCurrencyPound } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useRange, UseRangeProps } from "react-instantsearch";
import { Input } from "../form/input";
import { RangeSlider } from "../ui/range-slider";

export function RangeFilter(props: UseRangeProps) {
  const { start, range, canRefine, refine } = useRange(props);
  const step = 1 / 10;

  const [sliderValues, setSliderValues] = useState<[number, number]>([0, 100]);
  const [inputValues, setInputValues] = useState({
    from: "0",
    to: "100",
  });

  useEffect(() => {
    const minValue = range.min ?? 0;
    const maxValue = range.max ?? 100;
    const newStart: [number, number] = [
      start[0] !== undefined && start[0] !== -Infinity ? start[0] : minValue,
      start[1] !== undefined && start[1] !== Infinity ? start[1] : maxValue,
    ];
    setSliderValues(newStart);
    setInputValues({
      from: newStart[0].toString(),
      to: newStart[1].toString(),
    });
  }, [start, range.min, range.max, refine]);

  const handleSliderChange = (newValues: number[]) => {
    const typedValues: [number, number] = [newValues[0], newValues[1]];
    setSliderValues(typedValues);
    setInputValues({
      from: typedValues[0].toString(),
      to: typedValues[1].toString(),
    });
  };

  const handleSliderChangeEnd = () => {
    refine(sliderValues);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, type: "from" | "to") => {
    const value = event.target.value;
    setInputValues((prev) => ({ ...prev, [type]: value }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const minValue = range.min ?? 0;
    const maxValue = range.max ?? 100;
    const newValues: [number, number] = [
      inputValues.from ? Number(inputValues.from) : minValue,
      inputValues.to ? Number(inputValues.to) : maxValue,
    ];
    setSliderValues(newValues);
    refine(newValues);
  };

  return (
    <div className="w-full flex flex-col gap-2 py-2">
      <RangeSlider
        min={range.min ?? 0}
        max={range.max ?? 100}
        step={step}
        value={sliderValues}
        onValueChange={handleSliderChange}
        onValueCommit={handleSliderChangeEnd}
        disabled={!canRefine}
        className="w-full mb-4"
      />

      <form onSubmit={handleFormSubmit} className="flex items-center gap-2 w-full">
        <div className="flex items-center relative grow">
          <IconCurrencyPound className="absolute left-2 size-4 text-muted-foreground" />
          <Input
            type="number"
            min={range.min ?? 0}
            max={range.max ?? 100}
            value={parseFloat(inputValues.from).toFixed(2)}
            step={step}
            placeholder={(range.min ?? 0).toString()}
            disabled={!canRefine}
            className="pl-6"
            onChange={(e) => handleInputChange(e, "from")}
          />
        </div>

        <span className="text-muted-foreground">-</span>

        <div className="flex items-center relative grow">
          <IconCurrencyPound className="absolute left-2 size-4 text-muted-foreground" />

          <Input
            type="number"
            min={range.min ?? 0}
            max={range.max ?? 100}
            value={parseFloat(inputValues.to).toFixed(2)}
            step={step}
            placeholder={(range.max ?? 100).toString()}
            disabled={!canRefine}
            className="pl-6"
            onChange={(e) => handleInputChange(e, "to")}
          />
        </div>

        <Button type="submit" variant={"secondary"}>
          Filter
        </Button>
      </form>
    </div>
  );
}
