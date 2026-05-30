"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Cart } from "@haztetuexamen/shared";
import { getProductById } from "@haztetuexamen/shared";

interface CartStore extends Cart {
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  itemCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalCLP: 0,
      updatedAt: new Date().toISOString(),

      addItem: (productId: string, quantity = 1) => {
        const product = getProductById(productId);
        if (!product) return;

        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          let items: CartItem[];
          if (existing) {
            items = state.items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity + quantity }
                : i
            );
          } else {
            items = [
              ...state.items,
              { productId, quantity, unitPriceCLP: product.priceCLP },
            ];
          }
          const totalCLP = items.reduce(
            (sum, i) => sum + i.unitPriceCLP * i.quantity,
            0
          );
          return { items, totalCLP, updatedAt: new Date().toISOString() };
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const items = state.items.filter((i) => i.productId !== productId);
          const totalCLP = items.reduce(
            (sum, i) => sum + i.unitPriceCLP * i.quantity,
            0
          );
          return { items, totalCLP, updatedAt: new Date().toISOString() };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }
        set((state) => {
          const items = state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          );
          const totalCLP = items.reduce(
            (sum, i) => sum + i.unitPriceCLP * i.quantity,
            0
          );
          return { items, totalCLP, updatedAt: new Date().toISOString() };
        });
      },

      clear: () =>
        set({ items: [], totalCLP: 0, updatedAt: new Date().toISOString() }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "haztetuexamen-cart",
    }
  )
);
