import { z } from "zod";
import { ProductCategoryNames } from "./product.const";


const CreateProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Product name is required" }).min(3),
    description: z
      .string({ required_error: "Description is required" })
      .min(10),
    category: z.enum(ProductCategoryNames, {
      required_error: "Category is required",
    }),
    images: z
      .array(z.string())
      .nonempty({ message: "At least one image is required" }),
    price: z.number({ required_error: "Price is required" }).min(0),
    admin: z.string({ required_error: "Admin ID is required" }),
  }),
});

const UpdateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.enum(ProductCategoryNames).optional(),
    images: z.array(z.string()).optional(),
    price: z.number().min(0).optional(),
    admin: z.string().optional(),
  }),
});

export const ProductValidation = {
  CreateProductValidationSchema,
  UpdateProductValidationSchema,
};
