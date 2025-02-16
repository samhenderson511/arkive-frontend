"use client";

import { getCart } from "@/lib/server";
import { ApiCart } from "@/types";
import { useEffect } from "react";
import { create } from "zustand";
import { getVariantPrice } from "../util/format-product";

interface CartState {
  cart: ApiCart | null;
  setCart: (cart: ApiCart | null) => void;
}

const useCartState = create<CartState>((set) => ({
  cart: null,
  setCart: (cart: ApiCart | null) => set({ cart }),
}));

export interface Cart {
  cart: ApiCart | null;
  setCart: (cart: ApiCart) => void;
  /**
   * The tax of the cart
   */
  tax: number;
  /**
   * The subtotal of the cart excluding sales and discounts
   */
  subtotal: number;
  /**
   * The subtotal of the cart excluding discounts
   */
  salePriceSubtotal: number;
  /**
   * The shipping of the cart
   */
  shipping: number;
  /**
   * The discounts and sales of the cart
   */
  discounts: number;
  /**
   * The total of the cart
   */
  total: number;
}

export function useCart(): Cart {
  const { cart, setCart } = useCartState();

  useEffect(() => {
    if (cart) return;

    const fetchCart = async () => {
      const cart = await getCart();

      setCart(cart);
    };

    fetchCart();
  }, [cart]);

  const tax =
    cart?.lineItems?.reduce(
      (acc, { productVariant, quantity }) =>
        acc + getVariantPrice(productVariant).price * quantity * (productVariant.taxRate / 100),
      0
    ) ?? 0;

  const subtotal =
    (cart?.lineItems?.reduce(
      (acc, { productVariant, quantity }) => acc + getVariantPrice(productVariant).price * quantity,
      0
    ) ?? 0) - tax;

  const salePriceSubtotal =
    (cart?.lineItems?.reduce(
      (acc, { productVariant, quantity }) =>
        acc + getVariantPrice(productVariant).salePrice * quantity,
      0
    ) ?? 0) - tax;

  const shipping = cart?.shippingMethod?.price ?? 0;

  const discounts = subtotal - salePriceSubtotal;

  const total = subtotal - discounts + tax;

  return { cart, setCart, tax, subtotal, salePriceSubtotal, shipping, discounts, total };
}
