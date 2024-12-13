"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsValidationSchema = void 0;
const zod_1 = require("zod");
exports.ContactUsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().min(1, "First name is required"),
        lastName: zod_1.z.string().min(1, "Last name is required"),
        email: zod_1.z.string().email("Invalid email address"),
        message: zod_1.z.string().min(1, "Message is required"),
    }),
});
