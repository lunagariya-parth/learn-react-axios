import { useEffect, useReducer, useState } from "react";
import PageWrapper from "@/components/ui/page-wrapper";
import ProductCard from "./product-card";
import CartDrawer from "./cart-drawer";
import { initialState, ProductReducer, type Product } from "./productsReducer";
import axios from "axios";

export default function UseReducerPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      axios.get("https://dummyjson.com/products").then((response) => {
        dispatch({ type: "SET_PRODUCTS", payload: response.data.products });
        console.log(response.data.products);
      });
    };
    fetchProducts();
  }, []);
  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <PageWrapper title="E-Commerce Shop">
      <div className="space-y-6">
        {/* Header with Cart Button */}
        <div className="flex justify-between items-center p-6 bg-white rounded-lg shadow">
          <div>
            <h1 className="text-3xl font-bold">Shop environment friendly quality goods</h1>
            <p className="text-gray-600 mt-2">Eco-friendly products for sustainable living</p>
          </div>
          <CartDrawer
            isOpen={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
            cart={state.cart}
            addProductByOne={(productId) =>
              dispatch({ type: "ADD_QUANTITY_BY_ONE", payload: { productId } })
            }
            removeProductByOne={(productId) =>
              dispatch({ type: "REMOVE_QUANTITY_BY_ONE", payload: { productId } })
            }
            removeProduct={(productId) =>
              dispatch({ type: "REMOVE_FROM_CART", payload: { productId } })
            }
          />
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4 ">All Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
