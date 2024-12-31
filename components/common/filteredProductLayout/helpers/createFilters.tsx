import type { Product, ProductVariant } from "@medusajs/client-types"

export type Department = { title: string; subdepartments: string[] }

export function createFilters(products: Product[]) {
  const filters = products?.reduce(
    (acc, product) => {
      const brand = product.metadata.brand as string
      if (brand) acc.brands.add(brand.toLowerCase())

      const parts = product.handle.split("/")
      const department = parts[2]
      const subdepartment = parts[3]
      if (department) {
        let existingDepartment = acc.departments.find(
          (dep) => dep.title.toLowerCase() === department.toLowerCase()
        )

        // If the department doesn't exist, create it
        if (!existingDepartment) {
          existingDepartment = {
            title: department,
            subdepartments: [],
          }
          acc.departments.push(existingDepartment)
        }

        // Add subdepartment if it exists and is not already included
        if (
          subdepartment &&
          !existingDepartment.subdepartments.includes(
            subdepartment.toLowerCase()
          )
        ) {
          existingDepartment.subdepartments.push(subdepartment.toLowerCase())
        }
      }

      ;(product.variants as unknown as ProductVariant[]).forEach((variant) => {
        const colorGroup1 = variant.metadata.colourGroup1 as string
        const colorGroup2 = variant.metadata.colourGroup2 as string
        const size = variant.metadata.size as string
        if (colorGroup1) acc.colorGroups.add(colorGroup1.toLowerCase())
        if (colorGroup2) acc.colorGroups.add(colorGroup2.toLowerCase())
        if (size) acc.sizes.add(size.toLowerCase())
      })

      return acc
    },
    {
      brands: new Set<string>(),
      sizes: new Set<string>(),
      departments: [] as Department[],
      colorGroups: new Set<string>(),
    }
  )

  return filters
}
