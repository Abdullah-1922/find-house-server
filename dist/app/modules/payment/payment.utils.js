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
exports.verifyPayment = exports.initialPayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const initialPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const frontendUrl = config_1.default.NODE_ENV === "development"
        ? config_1.default.frontend_local_url
        : config_1.default.frontend_live_url;
    const backendUrl = config_1.default.NODE_ENV === "development"
        ? config_1.default.backend_local_url
        : config_1.default.backend_live_url;
    try {
        const response = yield axios_1.default.post(config_1.default.aamarpay_url, {
            store_id: config_1.default.store_id,
            signature_key: config_1.default.signature_key,
            tran_id: paymentData.transactionId,
            success_url: `${backendUrl}/api/v2/payments/confirmation/${paymentData.customerId}?transactionId=${paymentData.transactionId}&status=success`,
            fail_url: `${backendUrl}/api/v2/payments/confirmation/${paymentData.customerId}?transactionId=${paymentData.transactionId}&status=failed`,
            cancel_url: `${frontendUrl}`,
            amount: paymentData.amount,
            currency: paymentData.currency,
            desc: "Payment for premium access on TT&DG",
            cus_name: paymentData.name,
            cus_email: paymentData.email,
            cus_add1: paymentData.address,
            cus_add2: "N/A",
            cus_city: paymentData.city || "N/A",
            cus_state: paymentData.state || "N/A",
            cus_postcode: paymentData.zip || "N/A",
            cus_country: paymentData.country,
            cus_phone: paymentData.phone || "N/A",
            type: "json",
        });
        return response.data;
    }
    catch (error) {
        if (error.response) {
            console.error("API Error Response:", error.response.data);
        }
        else {
            console.error("Unexpected Error:", error.message);
        }
        throw new Error("Failed to initiate payment");
    }
});
exports.initialPayment = initialPayment;
const verifyPayment = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(config_1.default.payment_verify_url, {
            params: {
                request_id: transactionId,
                store_id: config_1.default.store_id,
                signature_key: config_1.default.signature_key,
                type: "json",
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error verifying payment:", error);
        throw new Error("Failed to verify payment");
    }
});
exports.verifyPayment = verifyPayment;
