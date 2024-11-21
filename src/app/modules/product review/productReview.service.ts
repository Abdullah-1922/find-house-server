import { ProductReview } from "./productReview.model";
import { TProductReview } from "./productReview.interface";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";

const createReview = async (payload: Partial<TProductReview>) => {
  const product = await Product.findById(payload.product);
  if (!product) {
    throw new AppError(404, "Product not found");
  }
  const review = await ProductReview.create(payload);

  if (review) {
    product.review.push(review._id);
    await product.save();
  }
  return review;
};

const getAllReviewsByProduct = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(404, "Product not found");
  }
  const reviews = await ProductReview.find({ product: productId }).populate([
    { path: "userId", select: "name" },
  ]);
  return reviews;
};

const updateReview = async (
  reviewId: string,
  payload: Partial<TProductReview>,
) => {
  const review = await ProductReview.findByIdAndUpdate(reviewId, payload, {
    new: true,
  });

  if (!review) {
    throw new AppError(404, "Review not found");
  }

  return review;
};

const deleteReview = async (reviewId: string) => {
  const review = await ProductReview.findByIdAndDelete(reviewId);

  if (!review) {
    throw new AppError(404, "Review not found");
  }

  const product = await Product.findById(review.product);
  if (product) {
    product.review = product.review.filter((id) => id.toString() !== reviewId);
    await product.save();
  }

  return review;
};

export const ProductReviewServices = {
  createReview,
  getAllReviewsByProduct,
  updateReview,
  deleteReview,
};
