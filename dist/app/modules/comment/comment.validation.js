"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidation = void 0;
const zod_1 = require("zod");
const createCommentValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, "User ID is required"),
        propertyId: zod_1.z.string().min(1, "Property ID is required"),
        comment: zod_1.z.string().min(1, "Comment is required"),
    }),
});
exports.CommentValidation = {
    createCommentValidation,
};
