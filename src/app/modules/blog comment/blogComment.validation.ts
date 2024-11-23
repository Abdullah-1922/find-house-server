import { z } from "zod";

const createBlogCommentValidation = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
    blogId: z.string().min(1, "Blog ID is required"),
    comment: z.string().min(1, "Comment is required"),
  }),
});
const updateBlogCommentValidation = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required").optional(),
    blogId: z.string().min(1, "Blog ID is required").optional(),
    comment: z.string().min(1, "Comment is required").optional(),
  }),
});
export const BlogCommentValidation = {
  createBlogCommentValidation,
  updateBlogCommentValidation,
};
