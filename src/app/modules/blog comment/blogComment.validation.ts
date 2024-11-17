import { z } from "zod";

const createBlogCommentValidation = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
    blogId: z.string().min(1, "Blog ID is required"),
    comment: z.string().min(1, "Comment is required"),
  }),
});
export const BlogCommentValidation = {
  createBlogCommentValidation,
};
