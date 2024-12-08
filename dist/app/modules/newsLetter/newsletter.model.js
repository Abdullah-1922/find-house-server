"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-useless-escape */
const mongoose_1 = require("mongoose");
const newsletterSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Valid email
    subscribedAt: { type: Date, default: Date.now }, // Subscription timestamp
}, { timestamps: true });
const Newsletter = (0, mongoose_1.model)("Newsletter", newsletterSchema);
exports.default = Newsletter;
