"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryValidation = exports.CreateInquiryValidationSchema = void 0;
// inquiry.validation.ts
const zod_1 = require("zod");
exports.CreateInquiryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        agent: zod_1.z.string().min(24).max(24),
        user: zod_1.z.string().min(24).max(24),
        fullName: zod_1.z.string().min(1),
        phone: zod_1.z.string().min(10).max(15),
        email: zod_1.z.string().email(),
        message: zod_1.z.string().min(1),
    }),
});
exports.InquiryValidation = {
    CreateInquiryValidationSchema: exports.CreateInquiryValidationSchema,
};
