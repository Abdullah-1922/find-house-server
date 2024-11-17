import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const BlogSchema: Schema = new Schema<TBlog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["House", "Garages", "Real Estate", "Home", "Bath", "Beds"],
      required: true,
    },
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    lovedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comment: [{ type: Schema.Types.ObjectId, ref: "BlogComment" }],
  },
  { timestamps: true },
);

export const Blog = model<TBlog>("Blog", BlogSchema);
