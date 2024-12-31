"use client"

import { Dispatch, SetStateAction } from "react"
import { Department } from "./helpers"
import type { Product, Region } from "@medusajs/client-types"

export type Filters = {
  products: Product[]
  filterData: Product[]
  filteredProducts: Product[]
  setFilteredProducts: Dispatch<SetStateAction<Product[]>>
  selectedSizes: Set<string>
  setSelectedSizes?: Dispatch<SetStateAction<Set<string>>>
  selectedBrands: Set<string>
  setSelectedBrands?: Dispatch<SetStateAction<Set<string>>>
  selectedDepartments: Department[]
  setSelectedDepartments?: Dispatch<SetStateAction<Department[]>>
  selectedSubDepartments: string[]
  setSelectedSubDepartments?: Dispatch<SetStateAction<string[]>>
  selectedColorGroups: Set<string>
  setSelectedColorGroups?: Dispatch<SetStateAction<Set<string>>>
  selectedPriceRange: number[]
  setSelectedPriceRange?: Dispatch<SetStateAction<number[]>>
  minPrice?: number
  maxPrice?: number
  startIndex?: number
  endIndex?: number
  productsPerPage?: number
  currentProducts?: Product[]
  setCurrentProducts?: Dispatch<SetStateAction<Product[]>>
  categoryHandle?: string
  region?: Region
}
