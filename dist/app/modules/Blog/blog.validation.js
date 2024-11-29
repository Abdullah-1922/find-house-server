"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const blog_constant_1 = require("./blog.constant");
const CreateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: "User Id is required" }).min(2).max(255),
        category: zod_1.z.enum(blog_constant_1.BlogCategoryNames),
        title: zod_1.z.string({ required_error: "Title is required" }),
        description: zod_1.z.string({ required_error: "Description is required" }),
        image: zod_1.z.string({ required_error: "Image is required" }),
    }),
});
const UpdateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(2).max(255).optional(),
        category: zod_1.z.enum(blog_constant_1.BlogCategoryNames).optional(),
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.BlogValidation = {
    CreateBlogValidationSchema,
    UpdateBlogValidationSchema,
};
