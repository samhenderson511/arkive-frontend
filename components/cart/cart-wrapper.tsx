"use client";

import { useGlobal } from "@/lib";
import { getCart } from "@/lib/server";
import { ReactNode, useEffect } from "react";

export function CartWrapper({ children }: { children: ReactNode }) {
  const { cart, setCart } = useGlobal();

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();

      setCart(cart);
    };

    if (!cart) {
      fetchCart();
    }
  }, [cart]);

  return children;
}
