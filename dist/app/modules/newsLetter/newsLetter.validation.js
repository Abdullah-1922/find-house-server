"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterValidationSchema = void 0;
const zod_1 = require("zod");
exports.newsletterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
    }),
});
