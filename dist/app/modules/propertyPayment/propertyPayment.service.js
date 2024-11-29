"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyPaymentService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const property_model_1 = __importDefault(require("../property/property.model"));
const user_model_1 = require("../User/user.model");
const propertyPayment_model_1 = __importDefault(require("./propertyPayment.model"));
const createPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, totalPrice, monthlyRent, leaseDuration, user, property } = paymentData;
    const propertyInfo = yield property_model_1.default.findById(property);
    if (!propertyInfo) {
        throw new Error("Property not found");
    }
    const userData = yield user_model_1.User.findById(user);
    if (!userData) {
        throw new Error("User not found");
    }
    // Validation for conditional fields
    if (category === "sell" && !totalPrice) {
        throw new Error("Total price is required for sell category");
    }
    if (category === "rent" && (!monthlyRent || !leaseDuration)) {
        throw new Error("Monthly rent and lease duration are required for rent category");
    }
    if (propertyInfo.category !== category) {
        throw new Error("Category does not match with property category");
    }
    const payment = yield propertyPayment_model_1.default.create(paymentData);
    if (payment) {
        yield property_model_1.default.findByIdAndUpdate(payment.property, {
            status: "non-active",
        });
    }
    return payment;
});
const getPayments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentQuery = new QueryBuilder_1.default(propertyPayment_model_1.default.find().populate("property user"), query);
    const payments = yield paymentQuery.modelQuery;
    const meta = yield paymentQuery.countTotal();
    return { payments, meta };
});
const getPaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield propertyPayment_model_1.default.findById(id).populate("property user");
    if (!payment) {
        throw new Error("Payment not found");
    }
    return payment;
});
const updatePaymentPayment = (id, paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyPayment = yield propertyPayment_model_1.default.findById(id);
    if (!propertyPayment) {
        throw new Error("Payment not found");
    }
    if (paymentData.property) {
        const propertyData = yield property_model_1.default.findById(paymentData.property);
        if (!propertyData) {
            throw new Error("Property not found");
        }
    }
    if (paymentData.user) {
        const userData = yield user_model_1.User.findById(paymentData.user);
        if (!userData) {
            throw new Error("User not found");
        }
    }
    if (paymentData.category) {
        throw new Error("Category cannot be updated");
    }
    const payment = yield propertyPayment_model_1.default.findByIdAndUpdate(id, paymentData, {
        new: true,
    });
    return payment;
});
exports.PropertyPaymentService = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePaymentPayment,
};
