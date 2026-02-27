import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./productSlice";
export type CartItem = Product & { quantity: number };
export type CartState = {
  cartItems: CartItem[];
  loading: boolean;
  error: boolean;
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [] as CartItem[],
    loading: true,
    error: false,
  } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    removeProductByOne: (state, action: PayloadAction<number>) => {
      const existingItem = state.cartItems.find((item) => item.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        }
      }
    },
  },
});
export const { addToCart, removeFromCart, removeProductByOne } = cartSlice.actions;
export default cartSlice.reducer;
