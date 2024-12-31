"use client";

import { UiBrands } from "@/types";
import { BrandsClient } from "./client";

export async function BrandsBlock({ scrollSpeed }: UiBrands) {
  const brands = [];

  return <BrandsClient scrollSpeed={scrollSpeed} brands={brands} />;
}
