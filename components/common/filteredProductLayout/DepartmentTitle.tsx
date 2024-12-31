import { toTitleCase } from "@/lib/util";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useMemo } from "react";
import { Checkbox, Label } from "..";
import { AccordionTrigger } from "../accordion";
import { Department } from "./helpers";
import type { Product } from "@medusajs/client-types";

export function SubDepartments({
  department,
  selectedSubDepartments,
  handleSubDepartmentFilter,
  products,
  filteredProducts,
}: {
  department: Department;
  selectedSubDepartments: string[];
  handleSubDepartmentFilter: (subdepartment: string) => (checked: CheckedState) => void;
  products: Product[];
  filteredProducts: Product[];
}) {
  const amountAvailable = useMemo(() => {
    const productSet = new Set(selectedSubDepartments.length === 0 ? filteredProducts : products);
    return (subDepartment) => {
      return Array.from(productSet).filter(
        (product) => (product.handle as string).toLowerCase().split("/")[3] === subDepartment
      ).length;
    };
  }, [selectedSubDepartments, filteredProducts, products]);

  return (
    <ul className="flex flex-col ml-3 gap-3">
      {department.subdepartments.map((subdepartment) => (
        <li key={subdepartment} className="flex items-center gap-3">
          <Checkbox
            name={subdepartment}
            id={subdepartment}
            value={subdepartment}
            checked={selectedSubDepartments.includes(subdepartment)}
            disabled={amountAvailable(subdepartment) === 0}
            onCheckedChange={handleSubDepartmentFilter(subdepartment)}
          />
          <Label className={"grow"} htmlFor={subdepartment}>
            {toTitleCase(subdepartment)}
          </Label>
          <span className="text-muted-foreground">{amountAvailable(subdepartment)}</span>
        </li>
      ))}
    </ul>
  );
}

export function DepartmentTitle({
  department,
  selectedDepartments,
  products,
  filteredProducts,
  getDepartmentCheckedState,
  handleDepartmentFilter,
}: {
  department: Department;
  getDepartmentCheckedState: (department: Department) => boolean | "indeterminate";
  handleDepartmentFilter: (department: Department) => (checked: CheckedState) => void;
  selectedDepartments: Department[];
  products: Product[];
  filteredProducts: Product[];
}) {
  const amountAvailable = useMemo(() => {
    const productSet = new Set(selectedDepartments.length === 0 ? filteredProducts : products);
    return (department) => {
      return Array.from(productSet).filter(
        (product) =>
          (product.handle as string).toLowerCase().split("/")[2] === department.title.toLowerCase()
      ).length;
    };
  }, [selectedDepartments, filteredProducts, products]);

  return (
    <div className={"flex items-center gap-3 w-full justify-stretch [&>h3]:grow"}>
      <Checkbox
        name={department.title}
        id={department.title}
        value={department.title}
        checked={getDepartmentCheckedState(department)}
        onCheckedChange={handleDepartmentFilter(department)}
        disabled={amountAvailable(department) === 0}
      />
      <AccordionTrigger disabled={amountAvailable(department) === 0}>
        <Label className={"grow text-start"} htmlFor={department.title}>
          {toTitleCase(department.title)}
        </Label>
        <span className="text-muted-foreground">{amountAvailable(department)}</span>
      </AccordionTrigger>
    </div>
  );
}
