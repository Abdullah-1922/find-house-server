"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = exports.updateUserValidationSchema = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
// Social Media Links Validation
const socialMediaLinksSchema = zod_1.z.object({
    facebook: zod_1.z.string().url().optional(),
    linkedIn: zod_1.z.string().url().optional(),
    twitter: zod_1.z.string().url().optional(),
    instagram: zod_1.z.string().url().optional(),
});
// Create User Validation Schema
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().min(2, "First name must have at least 2 characters"),
        secondName: zod_1.z
            .string()
            .min(2, "Second name must have at least 2 characters"),
        auth: zod_1.z.string().nonempty("Auth ID is required"),
        email: zod_1.z.string().email("Invalid email address").optional(),
        image: zod_1.z.string().url("Invalid image URL").optional(),
        phone: zod_1.z.string().optional(),
        role: zod_1.z.enum(["admin", "agent", "user"], {
            errorMap: () => ({ message: "Role must be admin, agent, or user" }),
        }),
        location: zod_1.z.string().optional(),
        favoriteProperties: zod_1.z.array(zod_1.z.string()).optional(),
        favoriteProducts: zod_1.z.array(zod_1.z.string()).optional(),
        paymentHistory: zod_1.z.array(zod_1.z.string()).optional(),
        property: zod_1.z.array(zod_1.z.string()).optional(),
        socialMediaLinks: socialMediaLinksSchema.optional(),
        createdAt: zod_1.z.date().optional(),
        updatedAt: zod_1.z.date().optional(),
    }),
});
// Update User Validation Schema
exports.updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z
            .string()
            .min(2, "First name must have at least 2 characters")
            .optional(),
        secondName: zod_1.z
            .string()
            .min(2, "Second name must have at least 2 characters")
            .optional(),
        email: zod_1.z.string().email("Invalid email address").optional(),
        image: zod_1.z.string().url("Invalid image URL").optional(),
        phone: zod_1.z.string().optional(),
        role: zod_1.z.enum(["admin", "agent", "user"]).optional(),
        location: zod_1.z.string().optional(),
        favoriteProperties: zod_1.z.array(zod_1.z.string()).optional(),
        favoriteProducts: zod_1.z.array(zod_1.z.string()).optional(),
        paymentHistory: zod_1.z.array(zod_1.z.string()).optional(),
        property: zod_1.z.array(zod_1.z.string()).optional(),
        socialMediaLinks: socialMediaLinksSchema.optional(),
        updatedAt: zod_1.z.date().optional(),
    }),
});
// Export User Validations
exports.UserValidations = {
    createUserValidationSchema: exports.createUserValidationSchema,
    updateUserValidationSchema: exports.updateUserValidationSchema,
};
