"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewValidation = void 0;
const zod_1 = require("zod");
const CreateReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: "User ID is required" }),
        product: zod_1.z.string({ required_error: "Product ID is required" }),
        rating: zod_1.z
            .number()
            .min(1, { message: "Rating must be at least 1" })
            .max(5, { message: "Rating must be at most 5" }),
        review: zod_1.z.string({ required_error: "Review is required" }),
    }),
});
const UpdateReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z
            .number()
            .min(1, { message: "Rating must be at least 1" })
            .max(5, { message: "Rating must be at most 5" })
            .optional(),
        review: zod_1.z.string().optional(),
    }),
});
exports.ProductReviewValidation = {
    CreateReviewValidationSchema,
    UpdateReviewValidationSchema,
};
