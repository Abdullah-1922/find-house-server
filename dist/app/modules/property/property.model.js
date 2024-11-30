"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const PropertyStatus = ["active", "non-active"];
const category = ["rent", "sell"];
const PropertyType = [
    "house",
    "commercial",
    "apartment",
    "lot",
    "garage",
];
const Features = [
    "Air Conditioning",
    "Swimming Pool",
    "Central Heating",
    "Laundry Room",
    "Gym",
    "Alarm",
    "Window Covering",
    "Refrigerator",
    "TV Cable & Wifi",
    "Microwave",
];
const ExtraInfoAge = [
    "0-1",
    "0-5",
    "0-10",
    "0-15",
    "0-20",
    "0-50",
    "50+",
];
const locationSchema = new mongoose_1.Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
}, { _id: false, versionKey: false });
const extraInfoSchema = new mongoose_1.Schema({
    age: { type: String, enum: ExtraInfoAge, required: true },
    rooms: { type: Number, min: 0, max: 6, default: 0 },
    bathrooms: { type: Number, min: 0, max: 6, default: 0 },
});
const contactInfoSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
});
const propertySchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ownedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    comment: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Comment" }],
    status: {
        type: String,
        enum: PropertyStatus,
        required: true,
        default: "active",
    },
    feedback: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Feedback" }],
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: category, required: true },
    floorPlanImage: [{ type: String }],
    type: { type: String, enum: PropertyType, required: true },
    rooms: { type: Number, min: 1, max: 5, default: 1 },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    images: [{ type: String }],
    videoUrl: [{ type: String }],
    favoriteBy: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    location: { type: locationSchema, required: true },
    extraInfo: { type: extraInfoSchema, required: true },
    features: { type: [String], enum: Features, required: true },
    contactInfo: { type: contactInfoSchema, required: true },
}, { timestamps: true });
const Property = mongoose_1.default.model("Property", propertySchema);
exports.default = Property;
