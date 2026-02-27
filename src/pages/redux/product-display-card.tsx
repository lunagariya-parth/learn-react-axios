import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "./features/cartSlice";
import type { Product } from "./features/productSlice";
import type { AppDispatch } from "./store/store";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch<AppDispatch>();
  const addProductToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col p-2 py-2 gap-4">
      <CardHeader className="px-0 grid-rows-1">
        <div className="text-6xl text-center bg-linear-to-br from-gray-50 to-gray-100 h-40 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain rounded-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 px-4">
        <div className="space-y-2">
          <Link className=" group hover:text-decoration-line" to={`/products/${product.id}`}>
            <CardTitle className="text-lg group-hover:underline">{product.title}</CardTitle>
          </Link>
          <CardDescription className="line-clamp-2">{product.description}</CardDescription>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold text-gray-900">₹{product.price.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 px-4 pb-4">
        <Button onClick={addProductToCart} className="w-full">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
