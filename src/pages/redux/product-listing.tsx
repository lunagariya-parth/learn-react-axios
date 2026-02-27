import { useEffect, useState } from "react";
import { type AppDispatch, type RootState } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/productSlice";
import ProductCard from "./product-display-card";
import ProductCartDrawer from "./product-cart-drawer";
export default function ProductListing() {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <div className=" shrink-0 flex justify-between items-center p-6 bg-white rounded-lg shadow">
        <div>
          <h1 className="text-3xl font-bold">Shopping Page</h1>
          <p className="text-gray-600 mt-2"> add items to your cart</p>
        </div>
        <ProductCartDrawer isOpen={open} onOpenChange={setOpen} />
      </div>
      <div className="flex flex-1 min-h-0 h-full overflow-y-auto mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading products</p>
        ) : (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
