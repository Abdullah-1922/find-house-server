"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    category: {
        type: String,
        enum: ["House", "Garages", "Real Estate", "Home", "Bath", "Beds"],
        required: true,
    },
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    lovedBy: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    comment: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "BlogComment" }],
}, { timestamps: true });
exports.Blog = (0, mongoose_1.model)("Blog", BlogSchema);
