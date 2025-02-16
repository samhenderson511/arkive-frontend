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
   * The subtotal of the cart excluding tax, sales and discounts
   */
  subtotal: number;
  /**
   * The subtotal of the cart excluding discounts
   */
  salePriceTotal: number;
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

/**
 * Custom hook for managing cart state and calculations
 * @returns {Cart} An object containing cart state and calculated values
 * @property {ApiCart | null} cart - The current cart object
 * @property {Function} setCart - Function to update the cart
 * @property {number} tax - Total tax amount for the cart
 * @property {number} subtotal - Subtotal excluding tax, sales, and discounts
 * @property {number} salePriceTotal - Subtotal excluding discounts
 * @property {number} shipping - Shipping cost
 * @property {number} discounts - Total discounts applied
 * @property {number} total - Final total amount
 */
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

  /**
   * Calculates total tax based on line items and their tax rates
   */
  const tax =
    cart?.lineItems?.reduce(
      (acc, { productVariant, quantity }) =>
        acc + getVariantPrice(productVariant).price * quantity * (productVariant.taxRate / 100),
      0
    ) ?? 0;

  /**
   * Calculates subtotal excluding tax, sales, and discounts
   */
  const subtotal =
    (cart?.lineItems?.reduce(
      (acc, { productVariant, quantity }) => acc + getVariantPrice(productVariant).price * quantity,
      0
    ) ?? 0) - tax;

  /**
   * Calculates subtotal excluding discounts
   */
  const salePriceTotal =
    cart?.lineItems?.reduce(
      (acc, { productVariant, quantity }) =>
        acc + getVariantPrice(productVariant).salePrice * quantity,
      0
    ) ?? 0;

  /**
   * Gets shipping cost from selected shipping method
   */
  const shipping = cart?.shippingMethod?.price ?? 0;

  /**
   * Calculates total discounts from various discount types
   */
  const discounts = {
    fromPercentageOff: (salePriceTotal * (cart?.discountCode?.percentageOff ?? 0)) / 100,
    fromAmountOffTotal: cart?.discountCode?.amountOffTotal ?? 0,
    fromAmountOffPerItem:
      cart?.lineItems?.reduce(
        (acc, { productVariant, quantity }) =>
          acc +
          Math.min(
            getVariantPrice(productVariant).salePrice,
            cart?.discountCode?.amountOffPerItem ?? 0
          ) *
            quantity,
        0
      ) ?? 0,
  };

  /**
   * Sums all discount types to get total discounts
   */
  const allDiscounts =
    discounts.fromPercentageOff + discounts.fromAmountOffTotal + discounts.fromAmountOffPerItem;

  /**
   * Calculates final total by subtracting discounts from sale price total
   */
  const total = salePriceTotal - allDiscounts;

  return { cart, setCart, tax, subtotal, salePriceTotal, shipping, discounts: allDiscounts, total };
}
