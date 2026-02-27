import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../features/cartSlice";
import { productSlice } from "../features/productSlice";

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
