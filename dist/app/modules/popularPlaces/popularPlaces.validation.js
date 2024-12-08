"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopularPlaceValidation = void 0;
const zod_1 = require("zod");
const createPopularPlaceSchema = zod_1.z.object({
    body: zod_1.z.object({
        location: zod_1.z.string().nonempty("Location is required"),
        propertyCount: zod_1.z
            .number()
            .min(0, "Property count must be a positive number"),
        images: zod_1.z
            .array(zod_1.z.string().url())
            .min(1, "At least one image URL is required"),
    }),
});
const UpdatedPopularPlaceSchema = zod_1.z.object({
    body: zod_1.z.object({
        location: zod_1.z.string().nonempty("Location is required").optional(),
        propertyCount: zod_1.z
            .number()
            .min(0, "Property count must be a positive number").optional(),
        images: zod_1.z
            .array(zod_1.z.string().url())
            .min(1, "At least one image URL is required").optional(),
    }),
});
exports.PopularPlaceValidation = {
    createPopularPlaceSchema,
    UpdatedPopularPlaceSchema,
};
