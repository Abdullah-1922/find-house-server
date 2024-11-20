import { Types } from "mongoose";

export interface TProductReview {
  userId: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  review: string;
}
