"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReview = void 0;
const mongoose_1 = require("mongoose");
const ProductReviewSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, required: true },
}, { timestamps: true });
exports.ProductReview = (0, mongoose_1.model)("ProductReview", ProductReviewSchema);
