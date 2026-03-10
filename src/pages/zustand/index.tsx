import { useEffect } from "react";
import { useProductStore } from "./store/store";

export default function ZustandPage() {
  const { products, fetchProducts } = useProductStore((state) => state);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <div>
      {products.map((product) => {
        return <h2>{product.title}</h2>;
      })}
    </div>
  );
}
