"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const propertyPaymentSchema = new mongoose_1.Schema({
    property: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Property" },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    category: { type: String, required: true, enum: ["sell", "rent"] },
    paymentDate: { type: Date, required: true },
    extraInfo: { type: String },
    totalPrice: {
        type: Number,
        required: function () {
            return this.category === "sell";
        },
    },
    monthlyRent: {
        type: Number,
        required: function () {
            return this.category === "rent";
        },
    },
    leaseDuration: {
        type: Number,
        required: function () {
            return this.category === "rent";
        },
    },
    paymentType: {
        type: String,
        required: true,
        enum: ["full", "installment"],
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["pending", "completed", "failed"],
    },
    gatewayName: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const PropertyPayment = (0, mongoose_1.model)("PropertyPayment", propertyPaymentSchema);
exports.default = PropertyPayment;
