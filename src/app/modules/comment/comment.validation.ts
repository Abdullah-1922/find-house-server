import { z } from "zod";

const createCommentValidation = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
    propertyId: z.string().min(1, "Property ID is required"),
    comment: z.string().min(1, "Comment is required"),
  }),
});
export const CommentValidation = {
  createCommentValidation,
};
