"use client";

import { CheckedState } from "@radix-ui/react-checkbox";
import { Accordion, AccordionContent, AccordionItem } from "../accordion";
import { DepartmentTitle, SubDepartments } from "./DepartmentTitle";
import { Filters } from "./Filters";
import { Department } from "./helpers";
import { filterProducts } from "./helpers/filterProducts";
import { useParamState } from "@/lib/hooks";

export function DepartmentFilters({
  departments,
  products,
  selectedBrands,
  selectedDepartments,
  setSelectedDepartments,
  selectedSubDepartments,
  setSelectedSubDepartments,
  filteredProducts,
  selectedColorGroups,
  selectedPriceRange,
  selectedSizes,
  setFilteredProducts,
  categoryHandle,
  region,
  productsPerPage,
  setCurrentProducts,
  endIndex,
  startIndex,
  filterData,
}: {
  departments: Department[];
} & Filters) {
  const [page, setPage] = useParamState("page", 1);

  function getDepartmentCheckedState(department: Department) {
    const subDeptTitles = department.subdepartments;
    const selectedSubs = selectedSubDepartments.filter((sub) => subDeptTitles.includes(sub));
    if (selectedSubs.length === 0) {
      return false;
    } else if (selectedSubs.length === subDeptTitles.length) {
      return true;
    } else {
      return "indeterminate";
    }
  }

  function handleDepartmentFilter(department: Department) {
    return (checked: CheckedState) => {
      let newSelectedDepartments = [...selectedDepartments];
      let newSelectedSubDepartments = [...selectedSubDepartments];

      if (checked) {
        if (!newSelectedDepartments.some((dep) => dep.title === department.title)) {
          newSelectedDepartments.push(department);
        }
        department.subdepartments.forEach((subDepartment) => {
          if (!newSelectedSubDepartments.includes(subDepartment)) {
            newSelectedSubDepartments.push(subDepartment);
          }
        });
      } else {
        newSelectedDepartments = newSelectedDepartments.filter((d) => d.title !== department.title);
        newSelectedSubDepartments = newSelectedSubDepartments.filter(
          (sd) => !department.subdepartments.includes(sd)
        );
      }

      setSelectedDepartments(newSelectedDepartments);
      setSelectedSubDepartments(newSelectedSubDepartments);
      page !== 1 && setPage(1);

      filterProducts({
        filterData,
        filteredProducts,
        setFilteredProducts,
        products,
        selectedBrands,
        selectedDepartments: newSelectedDepartments,
        selectedSubDepartments: newSelectedSubDepartments,
        selectedColorGroups,
        selectedPriceRange,
        selectedSizes,
        productsPerPage,
        categoryHandle,
        region,
        setCurrentProducts,
        endIndex,
        startIndex,
      });
    };
  }

  function handleSubDepartmentFilter(subDepartment: string) {
    return (checked: CheckedState) => {
      let newSelectedSubDepartments = [...selectedSubDepartments];

      if (checked) {
        if (!newSelectedSubDepartments.includes(subDepartment)) {
          newSelectedSubDepartments.push(subDepartment);
        }
      } else {
        newSelectedSubDepartments = newSelectedSubDepartments.filter((sd) => sd !== subDepartment);
      }

      setSelectedSubDepartments(newSelectedSubDepartments);
      page !== 1 && setPage(1);

      filterProducts({
        filterData,
        filteredProducts,
        setFilteredProducts,
        products,
        selectedBrands,
        selectedDepartments,
        selectedSubDepartments: newSelectedSubDepartments,
        selectedColorGroups,
        selectedPriceRange,
        selectedSizes,
        productsPerPage,
        categoryHandle,
        region,
        setCurrentProducts,
        endIndex,
        startIndex,
      });
    };
  }

  return (
    <Accordion
      collapsible
      defaultValue={departments?.length === 1 ? departments[0].title : null}
      type={"single"}
    >
      {departments?.map((department) => (
        <AccordionItem value={department.title} key={department.title}>
          <DepartmentTitle
            department={department}
            getDepartmentCheckedState={getDepartmentCheckedState}
            handleDepartmentFilter={handleDepartmentFilter}
            selectedDepartments={selectedDepartments}
            products={products}
            filteredProducts={filteredProducts}
          />
          <AccordionContent>
            {Boolean(department.subdepartments.length) && (
              <SubDepartments
                department={department}
                handleSubDepartmentFilter={handleSubDepartmentFilter}
                selectedSubDepartments={selectedSubDepartments}
                products={products}
                filteredProducts={filteredProducts}
              />
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
