import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';
import type { CartItemType } from '../utils/cartCalculations';

interface CartState {
  items: CartItemType[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) => set((state) => {
        const existingItem = state.items.find(item => item.product.id === product.id);
        if (existingItem) {
          // If exists and quantity < 5, increase by 1
          if (existingItem.quantity < 5) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }
          return state; // Reached max quantity
        }
        return {
          items: [...state.items, { product: { id: product.id, price: product.price, title: product.title, thumbnail: product.thumbnail }, quantity: 1 }]
        };
      }),
      removeItem: (productId: number) => set((state) => ({
        items: state.items.filter(item => item.product.id !== productId)
      })),
      updateQuantity: (productId: number, quantity: number) => set((state) => {
        // Enforce 1-5 limit
        const safeQuantity = Math.max(1, Math.min(5, quantity));
        return {
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity: safeQuantity }
              : item
          )
        };
      }),
      clearCart: () => set({ items: [] }),
      getItemCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'shopping-cart-storage',
    }
  )
);
