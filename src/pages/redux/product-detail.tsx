import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetcProductById } from "./features/productSlice";
import type { AppDispatch, RootState } from "./store/store";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Package, Trash, Pencil } from "lucide-react";
import ProductCartDrawer from "./product-cart-drawer";
import { addToCart, removeFromCart, removeProductByOne } from "./features/cartSlice";
import UpdateProductDialog from "./update-product";

export default function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const { loading, error } = useSelector((state: RootState) => ({
    loading: state.products.loading,
    error: state.products.error,
  }));
  useEffect(() => {
    if (productId) {
      dispatch(fetcProductById(Number(productId)));
    }
  }, [dispatch, productId]);
  const cartProducts = useSelector((state: RootState) => state.cart.cartItems);
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(productId)),
  );
  const isProductAddedInCart = cartProducts.find((item) => item.id === product?.id);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-destructive">Product Not Found</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/products")} className="w-full">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <Link to="/products" className=" flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setUpdateDialogOpen(true)}>
              <Pencil className="w-4 h-4" />
              Update Product
            </Button>
            <ProductCartDrawer isOpen={open} onOpenChange={setOpen} />
          </div>
        </div>

        {/* Main Product Card */}
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-8 md:p-12">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 w-full object-contain rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm font-medium text-secondary-foreground w-fit">
                  <Package className="w-3 h-3" />
                  {product.category}
                </div>

                {/* Title */}
                <CardTitle className="text-3xl md:text-4xl">{product.title}</CardTitle>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground line-through">
                    ₹{(product.price * 1.2).toFixed(2)}
                  </span>
                </div>

                {/* Description */}
                <CardDescription className="text-base leading-relaxed">
                  {product.description}
                </CardDescription>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className=" mt-auto">
                <div className="flex gap-3">
                  {!isProductAddedInCart ? (
                    <Button
                      onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                      className="flex-1"
                      size="lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => dispatch(removeProductByOne(product.id))}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center font-semibold">
                        {isProductAddedInCart.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                      >
                        +
                      </Button>
                    </div>
                  )}
                  {isProductAddedInCart && (
                    <Button
                      variant="destructive"
                      size="lg"
                      onClick={() => dispatch(removeFromCart(product.id))}
                      disabled={!isProductAddedInCart}
                    >
                      <Trash /> Remove from Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Update Product Dialog */}
        <UpdateProductDialog
          isOpen={updateDialogOpen}
          onOpenChange={setUpdateDialogOpen}
          product={product}
        />
      </div>
    </div>
  );
}
