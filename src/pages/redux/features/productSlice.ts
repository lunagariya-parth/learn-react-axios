import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
export type ProductState = {
  products: Product[];
  loading: boolean;
  error: boolean;
};

//Async Thunk
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

export const fetcProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: number) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    return response.data;
  },
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedProduct: Product) => {
    const response = await axios.put(
      `https://fakestoreapi.com/products/${updatedProduct.id}`,
      updatedProduct,
    );
    return response.data;
  },
);
export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: true,
    error: false,
  } as ProductState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        productSlice.caseReducers.addProducts(state, action);
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetcProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetcProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        const existingProductIndex = state.products.findIndex((p) => p.id === action.payload.id);

        if (existingProductIndex !== -1) {
          state.products[existingProductIndex] = action.payload;
        } else {
          state.products.push(action.payload);
        }
        state.loading = false;
        state.error = false;
      })
      .addCase(fetcProductById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const existingProductIndex = state.products.findIndex((p) => p.id === action.payload.id);

        if (existingProductIndex !== -1) {
          state.products[existingProductIndex] = action.payload;
        } else {
          state.products.push(action.payload);
        }
        state.loading = false;
        state.error = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const { addProducts } = productSlice.actions;
export default productSlice.reducer;
