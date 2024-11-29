import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductReviewServices } from "./productReview.service";

const createReview = catchAsync(async (req, res) => {
  const result = await ProductReviewServices.createReview(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getAllReviewsByProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductReviewServices.getAllReviewsByProduct(
    req.query,
    productId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const result = await ProductReviewServices.updateReview(reviewId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const result = await ProductReviewServices.deleteReview(reviewId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});
const getAllReviews = catchAsync(async (req, res) => {
  const result = await ProductReviewServices.getAllReviews(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All reviews retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getAllReviewsByUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await ProductReviewServices.getAllReviewsByUser(req.query, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews by user retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const ProductReviewControllers = {
  createReview,
  getAllReviewsByProduct,
  updateReview,
  deleteReview,
  getAllReviews,
  getAllReviewsByUser,
};


