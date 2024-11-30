"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const feedbackSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    property: { type: mongoose_1.Schema.Types.ObjectId, ref: "Property", required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 1 },
    feedback: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const FeedbackModel = (0, mongoose_1.model)("Feedback", feedbackSchema);
exports.default = FeedbackModel;
