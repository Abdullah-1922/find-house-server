"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Management = void 0;
const mongoose_1 = require("mongoose");
const ManagementSchema = new mongoose_1.Schema({
    aboutPage: {
        title: { type: String, required: false },
        description: { type: String, required: false },
        video: { type: String, required: false },
    },
    faqPage: {
        faq: [
            {
                question: { type: String, required: true },
                answer: { type: String, required: true },
            },
        ],
    },
    contactUsPage: {
        title: { type: String, required: false },
        description: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        location: { type: String, required: false },
        time: { type: String, required: false },
    },
});
exports.Management = (0, mongoose_1.model)("Management", ManagementSchema);
