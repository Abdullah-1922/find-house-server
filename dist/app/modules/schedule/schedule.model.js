"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const mongoose_1 = require("mongoose");
const scheduleSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    agent: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    property: { type: mongoose_1.Schema.Types.ObjectId, ref: "Property", required: true },
    date: { type: Date, required: true },
    time: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    }, // 24-hour format
    isApproved: { type: Boolean, default: false },
    isAccepted: { type: Boolean, default: false },
}, { timestamps: true });
exports.Schedule = (0, mongoose_1.model)("Schedule", scheduleSchema);
