import {
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from "@/components";
import { IconMail, IconPhone } from "@tabler/icons-react";
import { ControllerRenderProps } from "react-hook-form";
import { Field } from ".";

interface GetFieldComponentProps {
  fieldConfig: Field;
  field: ControllerRenderProps<
    {
      [x: string]: string | string[] | boolean;
    },
    string
  >;
}

export const getFieldComponent = ({ fieldConfig, field }: GetFieldComponentProps) => {
  switch (fieldConfig.fieldType) {
    case "textarea":
      return (
        <Textarea {...field} placeholder={fieldConfig.placeholder} value={field.value as string} />
      );

    case "email":
      return (
        <div className="relative flex items-center">
          <IconMail className="absolute z-10 left-4 size-4 text-muted-foreground" />
          <Input
            className="pl-11"
            {...field}
            placeholder={fieldConfig.placeholder}
            value={field.value as string}
          />
        </div>
      );

    case "phone":
      return (
        <div className="relative flex items-center">
          <IconPhone className="absolute z-10 left-4 size-4 text-muted-foreground" />
          <Input
            className="pl-11"
            {...field}
            placeholder={fieldConfig.placeholder}
            value={field.value as string}
          />
        </div>
      );

    case "checkbox":
      return (
        <ul className="flex flex-col gap-3 mt-2">
          {fieldConfig.options?.map((option) => {
            const fieldValue = field.value as string[];

            return (
              <li key={option.value}>
                <Label htmlFor={option.value} className="flex items-center gap-3 justify-between">
                  {option.label}
                  <Switch
                    checked={fieldValue?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...fieldValue, option.value]);
                      } else {
                        field.onChange(fieldValue.filter((value) => value !== option.value));
                      }
                    }}
                    id={option.value}
                  />
                </Label>
              </li>
            );
          })}
        </ul>
      );

    case "radio":
      return (
        <RadioGroup
          {...field}
          onValueChange={field.onChange}
          value={field.value as string}
          className="flex flex-col gap-3 mt-2"
        >
          {fieldConfig.options?.map((option) => (
            <Label key={option.value} htmlFor={option.value} className="flex items-center gap-3">
              <RadioGroupItem id={option.value} value={option.value} />
              {option.label}
            </Label>
          ))}
        </RadioGroup>
      );

    case "dropdown":
      return (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={fieldConfig.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {fieldConfig.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    default:
      return (
        <Input {...field} placeholder={fieldConfig.placeholder} value={field.value as string} />
      );
  }
};
