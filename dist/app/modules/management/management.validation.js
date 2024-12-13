"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.managementSchema = void 0;
const zod_1 = require("zod");
const aboutPageSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    video: zod_1.z.string().optional(),
    signatureImage: zod_1.z.string().optional(),
    btnLink: zod_1.z.string().optional(),
}).optional();
const faqSchema = zod_1.z.object({
    question: zod_1.z.string(),
    answer: zod_1.z.string(),
});
const faqPageSchema = zod_1.z.object({
    faq: zod_1.z.array(faqSchema),
}).optional();
const contactUsPageSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    time: zod_1.z.string().optional(),
}).optional();
exports.managementSchema = zod_1.z.object({
    body: zod_1.z.object({
        aboutPage: aboutPageSchema,
        faqPage: faqPageSchema,
        contactUsPage: contactUsPageSchema,
    }),
});
