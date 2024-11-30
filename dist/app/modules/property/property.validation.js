"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyValidations = exports.updatePropertyValidationSchema = exports.createPropertyValidationSchema = void 0;
const zod_1 = require("zod");
const locationValidationSchema = zod_1.z.object({
    address: zod_1.z.string().min(1, "Address is required"),
    city: zod_1.z.string().min(1, "City is required"),
    state: zod_1.z.string().min(1, "State is required"),
    country: zod_1.z.string().min(1, "Country is required"),
    latitude: zod_1.z.string().min(1, "Latitude is required"),
    longitude: zod_1.z.string().min(1, "Longitude is required"),
});
const extraInfoValidationSchema = zod_1.z.object({
    age: zod_1.z.enum(["0-1", "0-5", "0-10", "0-15", "0-20", "0-50", "50+"]),
    rooms: zod_1.z.number().min(0).max(6).default(0),
    bathrooms: zod_1.z.number().min(0).max(6).default(0),
});
const contactInfoValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    userName: zod_1.z.string().min(1, "Username is required"),
    phone: zod_1.z.string().min(1, "Phone is required"),
    email: zod_1.z.string().email("Invalid email format"),
});
exports.createPropertyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        author: zod_1.z.string().nonempty("Author ID is required"),
        ownedBy: zod_1.z.string().optional(),
        status: zod_1.z.enum(["active", "non-active"]),
        title: zod_1.z.string().min(1, "Title is required"),
        description: zod_1.z.string().min(1, "Description is required"),
        category: zod_1.z.enum(["rent", "sell"]),
        type: zod_1.z.enum(["house", "commercial", "apartment", "lot", "garage"]),
        rooms: zod_1.z.number().min(1).max(5).default(1),
        price: zod_1.z.number().positive("Price must be a positive number"),
        area: zod_1.z.number().positive("Area must be a positive number"),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        floorPlanImage: zod_1.z.array(zod_1.z.string()).optional(),
        videoUrl: zod_1.z.array(zod_1.z.string()).optional(),
        location: locationValidationSchema,
        extraInfo: extraInfoValidationSchema,
        features: zod_1.z
            .array(zod_1.z.enum([
            "Air Conditioning",
            "Swimming Pool",
            "Central Heating",
            "Laundry Room",
            "Gym",
            "Alarm",
            "Window Covering",
            "Refrigerator",
            "TV Cable & Wifi",
            "Microwave",
        ]))
            .nonempty("At least one feature is required"),
        contactInfo: contactInfoValidationSchema,
    }),
});
exports.updatePropertyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        ownedBy: zod_1.z.string().nonempty("Owner ID is required").optional(),
        status: zod_1.z.enum(["active", "non-active"]).optional(),
        title: zod_1.z.string().min(1, "Title is required").optional(),
        description: zod_1.z.string().min(1, "Description is required").optional(),
        category: zod_1.z.enum(["rent", "sell"]).optional(),
        type: zod_1.z
            .enum(["house", "commercial", "apartment", "lot", "garage"])
            .optional(),
        rooms: zod_1.z.number().min(1).max(5).default(1).optional(),
        price: zod_1.z.number().positive("Price must be a positive number").optional(),
        area: zod_1.z.number().positive("Area must be a positive number").optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        floorPlanImage: zod_1.z.array(zod_1.z.string()).optional(),
        videoUrl: zod_1.z.array(zod_1.z.string()).optional(),
        location: locationValidationSchema.partial().optional(),
        extraInfo: extraInfoValidationSchema.partial().optional(),
        features: zod_1.z
            .array(zod_1.z.enum([
            "Air Conditioning",
            "Swimming Pool",
            "Central Heating",
            "Laundry Room",
            "Gym",
            "Alarm",
            "Window Covering",
            "Refrigerator",
            "TV Cable & Wifi",
            "Microwave",
        ]))
            .nonempty("At least one feature is required")
            .optional(),
        contactInfo: contactInfoValidationSchema.partial().optional(),
    }),
});
exports.PropertyValidations = {
    createPropertyValidationSchema: exports.createPropertyValidationSchema,
    updatePropertyValidationSchema: exports.updatePropertyValidationSchema,
};
