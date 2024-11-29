"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyPaymentValidation = void 0;
const zod_1 = require("zod");
const createPropertyPaymentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        property: zod_1.z.string().min(24, "Invalid property ID"),
        user: zod_1.z.string().min(24, "Invalid user ID"),
        category: zod_1.z.enum(["sell", "rent"]),
        paymentDate: zod_1.z.string().transform((val) => new Date(val)),
        totalPrice: zod_1.z.number().optional(),
        monthlyRent: zod_1.z.number().optional(),
        leaseDuration: zod_1.z.number().optional(),
        paymentType: zod_1.z.enum(["full", "installment"]),
        paymentStatus: zod_1.z.enum(["pending", "completed", "failed"]),
        gatewayName: zod_1.z.string(),
        currency: zod_1.z.string(),
    }),
});
exports.PropertyPaymentValidation = {
    createPropertyPaymentValidationSchema,
};
