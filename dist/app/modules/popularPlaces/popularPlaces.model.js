"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopularPlace = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const popularPlaceSchema = new mongoose_1.default.Schema({
    location: {
        type: String,
        required: true,
        trim: true,
    },
    propertyCount: {
        type: Number,
        required: true,
        min: 0,
    },
    images: {
        type: [String],
        validate: {
            validator: (val) => val.length > 0,
            message: 'At least one image is required.',
        },
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.PopularPlace = mongoose_1.default.model('PopularPlace', popularPlaceSchema);
