import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProductType = {
  id: number | string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
export type ProductStoreType = {
  products: ProductType[];
  fetchProducts: () => Promise<void>;
  addProducts: (products: ProductType[]) => void;
  addSingleProduct: (product: ProductType) => void;
  removeProduct: (productId: number | string) => void;
};

export const useProductStore = create<ProductStoreType>()(
  persist(
    (set, get) => {
      return {
        products: [],
        fetchProducts: async () => {
          try {
            const res = await axios.get("https://fakestoreapi.com/products");
            set({ products: res.data });
          } catch (error) {
            set({
              products: get().products,
            });
            new Error(`error fetching products:  ${error}`);
          }
        },
        addProducts: (products: ProductType[]) => {
          set({
            products: [...get().products, ...products],
          });
        },
        addSingleProduct: (product: ProductType) => {
          set({
            products: [...get().products, product],
          });
        },
        removeProduct: (productId: number | string) => {
          set({
            products: get().products.filter((product) => product.id !== productId),
          });
        },
      };
    },
    { name: "hello zustand" },
  ),
);
