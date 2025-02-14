"use client";

import { create } from "zustand";

export interface GlobalState {
  openCart: boolean;
  setOpenCart: (open: boolean) => void;
  openSearch: boolean;
  setOpenSearch: (open: boolean) => void;
  openMenu: boolean;
  setOpenMenu: (open: boolean) => void;
}

export const useGlobal = create<GlobalState>((set) => ({
  openCart: false,
  setOpenCart: (open: boolean) => set({ openCart: open }),
  openSearch: false,
  setOpenSearch: (open: boolean) => set({ openSearch: open }),
  openMenu: false,
  setOpenMenu: (open: boolean) => set({ openMenu: open }),
}));
