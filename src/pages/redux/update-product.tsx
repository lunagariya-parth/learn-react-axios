import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateProduct, type Product } from "./features/productSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { AppDispatch } from "./store/store";
import { useDispatch } from "react-redux";

const productSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  price: z.number().positive("Price must be greater than 0"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Please enter a valid URL"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface UpdateProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export default function UpdateProductDialog({
  isOpen,
  onOpenChange,
  product,
}: UpdateProductDialogProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title || "",
      price: product?.price || 0,
      category: product?.category || "",
      description: product?.description || "",
      image: product?.image || "",
    },
  });
  const dispach = useDispatch<AppDispatch>();

  // Reset form when dialog opens with product data
  useEffect(() => {
    if (isOpen && product) {
      reset({
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
      });
    }
  }, [isOpen, product, reset]);

  const onSubmit = (data: ProductFormData) => {
    try {
      dispach(updateProduct({ ...data, id: product!.id } as Product));
      console.log("Product updated successfully:", data);
      onOpenChange(false);
      return true;
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>
            Make changes to the product information below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Title */}
          <Field>
            <FieldLabel htmlFor="title">Product Title</FieldLabel>
            <Input
              {...register("title")}
              id="title"
              placeholder="Enter product title"
              aria-invalid={!!errors.title}
            />
            {errors.title && <FieldError errors={[{ message: errors.title.message }]} />}
          </Field>

          {/* Price and Category Row */}
          <div className="grid grid-cols-1   gap-4">
            <Field>
              <FieldLabel htmlFor="price">Price (₹)</FieldLabel>
              <Input
                {...register("price", { valueAsNumber: true })}
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                aria-invalid={!!errors.price}
              />
              {errors.price && <FieldError errors={[{ message: errors.price.message }]} />}
            </Field>
          </div>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              {...register("description")}
              id="description"
              placeholder="Enter product description"
              rows={4}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <FieldError errors={[{ message: errors.description.message }]} />
            )}
            <FieldDescription>Provide a detailed description of the product.</FieldDescription>
          </Field>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
