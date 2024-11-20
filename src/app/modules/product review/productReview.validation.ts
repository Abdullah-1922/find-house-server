import { z } from "zod";

const CreateReviewValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: "User ID is required" }),
    product: z.string({ required_error: "Product ID is required" }),
    rating: z
      .number()
      .min(1, { message: "Rating must be at least 1" })
      .max(5, { message: "Rating must be at most 5" }),
    review: z.string({ required_error: "Review is required" }),
  }),
});

const UpdateReviewValidationSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .min(1, { message: "Rating must be at least 1" })
      .max(5, { message: "Rating must be at most 5" })
      .optional(),
    review: z.string().optional(),
  }),
});

export const ProductReviewValidation = {
  CreateReviewValidationSchema,
  UpdateReviewValidationSchema,
};
