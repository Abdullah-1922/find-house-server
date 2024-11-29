"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCommentValidation = void 0;
const zod_1 = require("zod");
const createBlogCommentValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, "User ID is required"),
        blogId: zod_1.z.string().min(1, "Blog ID is required"),
        comment: zod_1.z.string().min(1, "Comment is required"),
    }),
});
const updateBlogCommentValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, "User ID is required").optional(),
        blogId: zod_1.z.string().min(1, "Blog ID is required").optional(),
        comment: zod_1.z.string().min(1, "Comment is required").optional(),
    }),
});
exports.BlogCommentValidation = {
    createBlogCommentValidation,
    updateBlogCommentValidation,
};
