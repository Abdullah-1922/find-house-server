import { z } from "zod";
import { BlogCategoryNames } from "./blog.constant";

const CreateBlogValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: "User Id is required" }).min(2).max(255),
    category: z.enum(BlogCategoryNames as [string, ...string[]]),
    title: z.string({ required_error: "Title is required" }),
    description: z.string({ required_error: "Description is required" }),
    image: z.string({ required_error: "Image is required" }),
  }),
});
const UpdateBlogValidationSchema = z.object({
  body: z.object({
    userId: z.string().min(2).max(255).optional(),
    category: z.enum(BlogCategoryNames as [string, ...string[]]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const BlogValidation = {
  CreateBlogValidationSchema,
  UpdateBlogValidationSchema,
};
