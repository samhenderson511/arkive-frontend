"use client";

import { getCart } from "@/lib/server";
import { ApiCart } from "@/types";
import { useEffect } from "react";
import { create } from "zustand";

interface CartState {
  cart: ApiCart | null;
  setCart: (cart: ApiCart | null) => void;
}

const useCartState = create<CartState>((set) => ({
  cart: null,
  setCart: (cart: ApiCart | null) => set({ cart }),
}));

export function useCart() {
  const { cart, setCart } = useCartState();

  useEffect(() => {
    if (cart) return;

    const fetchCart = async () => {
      const cart = await getCart();

      setCart(cart);
    };

    fetchCart();
  }, [cart]);

  return { cart, setCart };
}
