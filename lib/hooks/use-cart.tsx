"use client";

import { getCart } from "@/lib/server";
import { ApiCart } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobal } from "../global-store";

export function useCart() {
  const [cart, setCart] = useState<ApiCart | null>(null);
  const pathname = usePathname();
  const { openCart } = useGlobal();

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();

      setCart(cart);
    };

    fetchCart();
  }, [openCart, pathname]);

  return { cart };
}
