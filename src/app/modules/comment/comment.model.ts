import mongoose from "mongoose";
import { TComment } from "./comment.interface";

const commentSchema = new mongoose.Schema<TComment>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    comment: { type: String, required: true },
  },
  { timestamps: true },
);

export const Comment = mongoose.model<TComment>("Comment", commentSchema);
