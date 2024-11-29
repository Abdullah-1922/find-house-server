"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_const_1 = require("./product.const");
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: product_const_1.ProductCategoryNames,
    },
    images: {
        type: [String],
        validate: [
            (val) => val.length > 0,
            "At least one image is required",
        ],
    },
    favoriteBy: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    admin: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    review: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "ProductReview",
        },
    ],
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
});
exports.Product = mongoose_1.default.model("Product", productSchema);
