import { model, Schema } from "mongoose";
import { TProductReview } from "./productReview.interface";

const ProductReviewSchema: Schema = new Schema<TProductReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProductReview = model<TProductReview>(
  "ProductReview",
  ProductReviewSchema
);
