"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inquiry = void 0;
const mongoose_1 = require("mongoose");
const inquirySchema = new mongoose_1.Schema({
    agent: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });
exports.Inquiry = (0, mongoose_1.model)("Inquiry", inquirySchema);
