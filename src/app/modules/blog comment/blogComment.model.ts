import mongoose from "mongoose";
import { TBlogComment } from "./blogComment.interface";

const blogCommentSchema = new mongoose.Schema<TBlogComment>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },

    comment: { type: String, required: true },
  },
  { timestamps: true },
);

export const BlogComment = mongoose.model<TBlogComment>(
  "BlogComment",
  blogCommentSchema,
);
