"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const product_const_1 = require("./product.const");
const CreateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Product name is required" }).min(3),
        description: zod_1.z
            .string({ required_error: "Description is required" })
            .min(10),
        category: zod_1.z.enum(product_const_1.ProductCategoryNames, {
            required_error: "Category is required",
        }),
        images: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "At least one image is required" }),
        price: zod_1.z.number({ required_error: "Price is required" }).min(0),
        admin: zod_1.z.string({ required_error: "Admin ID is required" }),
    }),
});
const UpdateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        category: zod_1.z.enum(product_const_1.ProductCategoryNames).optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        price: zod_1.z.number().min(0).optional(),
        admin: zod_1.z.string().optional(),
    }),
});
exports.ProductValidation = {
    CreateProductValidationSchema,
    UpdateProductValidationSchema,
};
