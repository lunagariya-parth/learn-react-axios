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
import type { Product } from "./productsReducer";

interface ProductCardProps {
  product: Product;
  addToCart: () => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col p-2 py-2 gap-4">
      <CardHeader className="px-0 grid-rows-1">
        <div className="text-6xl text-center bg-linear-to-br from-gray-50 to-gray-100 h-40 rounded-lg overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 px-4">
        <div className="space-y-2">
          <CardTitle className="text-lg">{product.title}</CardTitle>
          <CardDescription className="line-clamp-2">{product.description}</CardDescription>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold text-gray-900">₹{product.price.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 px-4 pb-4">
        <Button onClick={addToCart} className="w-full">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
