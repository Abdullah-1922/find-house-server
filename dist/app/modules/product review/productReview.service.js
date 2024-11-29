"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewServices = void 0;
const productReview_model_1 = require("./productReview.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../product/product.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(payload.product);
    if (!product) {
        throw new AppError_1.default(404, "Product not found");
    }
    const review = yield productReview_model_1.ProductReview.create(payload);
    if (review) {
        product.review.push(review._id);
        yield product.save();
    }
    return review;
});
const getAllReviewsByProduct = (query, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new AppError_1.default(404, "Product not found");
    }
    const reviewQuery = new QueryBuilder_1.default(productReview_model_1.ProductReview.find({ product: productId }).populate("userId"), query)
        .search(["review", "rating"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield reviewQuery.modelQuery;
    const meta = yield reviewQuery.countTotal();
    return { data: result, meta };
});
const updateReview = (reviewId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield productReview_model_1.ProductReview.findByIdAndUpdate(reviewId, payload, {
        new: true,
    });
    if (!review) {
        throw new AppError_1.default(404, "Review not found");
    }
    return review;
});
const deleteReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield productReview_model_1.ProductReview.findByIdAndDelete(reviewId);
    if (!review) {
        throw new AppError_1.default(404, "Review not found");
    }
    const product = yield product_model_1.Product.findById(review.product);
    if (product) {
        product.review = product.review.filter((id) => id.toString() !== reviewId);
        yield product.save();
    }
    return review;
});
const getAllReviews = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewQuery = new QueryBuilder_1.default(productReview_model_1.ProductReview.find().populate("userId"), query)
        .search(["review", "rating"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield reviewQuery.modelQuery;
    const meta = yield reviewQuery.countTotal();
    return { data: result, meta };
});
const getAllReviewsByUser = (query, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewQuery = new QueryBuilder_1.default(productReview_model_1.ProductReview.find({ userId }).populate("userId"), query)
        .search(["review", "rating"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield reviewQuery.modelQuery;
    const meta = yield reviewQuery.countTotal();
    return { data: result, meta };
});
exports.ProductReviewServices = {
    createReview,
    getAllReviewsByProduct,
    updateReview,
    deleteReview,
    getAllReviews,
    getAllReviewsByUser
};
