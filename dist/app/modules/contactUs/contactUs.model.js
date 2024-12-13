"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUS = void 0;
const mongoose_1 = require("mongoose");
const contactUSSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});
exports.ContactUS = (0, mongoose_1.model)("ContactUS", contactUSSchema);
