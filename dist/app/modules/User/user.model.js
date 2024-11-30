"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    auth: { type: mongoose_1.Schema.Types.ObjectId, ref: "Auth", required: true },
    email: { type: String, required: false, default: "N/A" },
    image: { type: String, required: false },
    phone: { type: String, required: false, default: "N/A" },
    role: { type: String, enum: ["user", "admin", "agent"], default: "user" },
    location: { type: String, required: false, default: "N/A" },
    favoriteProperties: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Property" }],
    favoriteProducts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Product" }],
    paymentHistory: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Payment" }],
    property: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Property" }],
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
