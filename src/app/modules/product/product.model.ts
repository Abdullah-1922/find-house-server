import mongoose from "mongoose";
import { ProductCategoryNames } from "./product.const";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ProductCategoryNames,
    },
    images: {
      type: [String],
      validate: [
        (val: string[]) => val.length > 0,
        "At least one image is required",
      ],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductReview",
      },
    ],
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  },
);

export const Product = mongoose.model("Product", productSchema);
