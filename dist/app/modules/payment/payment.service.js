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
exports.PaymentService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const user_model_1 = require("../User/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const uuid_1 = require("uuid");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const payment_utils_1 = require("./payment.utils");
const payment_model_1 = require("./payment.model");
const date_fns_1 = require("date-fns");
const product_model_1 = require("../product/product.model");
const createPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(payload.customerId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User is not found");
    }
    // Generate a transition ID
    const generateTransactionId = () => {
        const randomText = (0, uuid_1.v4)().replace(/-/g, "");
        const trimmedText = randomText.substring(0, 8);
        return `FHTX-${trimmedText}`;
    };
    const transactionId = generateTransactionId();
    const paymentData = Object.assign(Object.assign({}, payload), { transactionId });
    // Make the initial payment request
    const paymentResponse = yield (0, payment_utils_1.initialPayment)(paymentData);
    if (!paymentResponse) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Payment initiation failed");
    }
    // Save payment data to the database
    const result = yield payment_model_1.Payment.create(Object.assign(Object.assign({}, paymentData), { customerId: payload.customerId }));
    return {
        paymentResponse,
        result,
    };
});
const cashOnDeliveryPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(payload === null || payload === void 0 ? void 0 : payload.customerId);
    // Generate a transition ID
    const generateTransactionId = () => {
        const randomText = (0, uuid_1.v4)().replace(/-/g, "");
        const trimmedText = randomText.substring(0, 8);
        return `FHTX-${trimmedText}`;
    };
    const transactionId = generateTransactionId();
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield payment_model_1.Payment.create(Object.assign(Object.assign({}, payload), { transactionId }));
    console.log("payment result", result);
    return result;
});
const paymentConformationIntoDB = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    let paymentStatus = "failed";
    let message = "Payment Failed. Please try again.";
    const paymentData = yield payment_model_1.Payment.findOne({ transactionId });
    // remove this id on the user model
    if (status === "failed") {
        yield payment_model_1.Payment.findOneAndUpdate({ transactionId }, { status: "Failed" });
    }
    if (status === "success") {
        const productIds = paymentData === null || paymentData === void 0 ? void 0 : paymentData.products;
        console.log("productIds", productIds);
        if (productIds && productIds.length > 0) {
            // Step 1: Remove matching productIds from the user's favoriteProducts
            const updatedUser = yield user_model_1.User.findByIdAndUpdate(paymentData.customerId, {
                $pull: {
                    favoriteProducts: { $in: productIds }, // Remove matching productIds
                },
            }, { new: true });
            console.log("Updated User:", updatedUser);
            // Step 2: Update each product's favoriteBy array
            const updateProductPromises = productIds.map((productId) => __awaiter(void 0, void 0, void 0, function* () {
                return product_model_1.Product.findByIdAndUpdate(productId, {
                    $pull: {
                        favoriteBy: paymentData.customerId,
                    },
                }, { new: true });
            }));
            // Execute all update operations
            const updatedProducts = yield Promise.all(updateProductPromises);
            console.log("Updated Products:", updatedProducts);
        }
        else {
            console.log("No products to remove from favoriteProducts.");
        }
        const verifyResponse = yield (0, payment_utils_1.verifyPayment)(transactionId);
        if (verifyResponse && verifyResponse.pay_status === "Successful") {
            const updatedPayment = yield payment_model_1.Payment.findOneAndUpdate({ transactionId }, { status: "Paid" }, { new: true });
            if (!updatedPayment) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Payment record not found");
            }
            paymentStatus = "success";
            message =
                "Thank you for upgrading to premium access. Your transaction has been completed successfully!";
        }
    }
    const icon = paymentStatus === "success" ? "&#10004;" : "&#10008;";
    const iconClass = paymentStatus === "success" ? "success" : "failure";
    const header = paymentStatus === "success" ? "Payment Successful" : "Payment Failed";
    const buttonClass = paymentStatus === "success" ? "button" : "button failure";
    const buttonText = paymentStatus === "success" ? "Return to Dashboard" : "Try Payment Again";
    const details = paymentStatus === "success"
        ? `
        <div>
            <span>Amount Paid:</span>
            <span>${paymentData === null || paymentData === void 0 ? void 0 : paymentData.amount}</span>
        </div>
        <div>
            <span>Transaction ID:</span>
            <span>${transactionId}</span>
        </div>
        <div>
            <span>Date:</span>
            <span>${(0, date_fns_1.format)(new Date(paymentData === null || paymentData === void 0 ? void 0 : paymentData.createdAt), "dd MMM, yyyy")}</span>
        </div>
      `
        : `
        <div>
            <span>Error Code:</span>
            <span>ERR12345</span>
        </div>
        <div>
            <span>Date:</span>
            <span>${(0, date_fns_1.format)(new Date(), "dd MMM, yyyy")}</span>
        </div>
        <div>
            <span>Attempted Amount:</span>
            <span>৳ ${(paymentData === null || paymentData === void 0 ? void 0 : paymentData.amount) || "৳ 0.00"}</span>
        </div>
      `;
    return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${header}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            width: 100%;
            max-width: 400px;
            text-align: center;
        }
        .icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        .success {
            color: #4CAF50;
        }
        .failure {
            color: #F44336;
        }
        h1 {
            color: #333;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        p {
            color: #666;
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 1.5rem;
        }
        .details {
            background-color: #f9f9f9;
            border-radius: 4px;
            padding: 1rem;
            margin-bottom: 1.5rem;
            text-align: left;
        }
        .details div {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        .details span:first-child {
            font-weight: bold;
            color: #333;
        }
        .button {
            background-color: #4CAF50;
            border: none;
            border-radius: 4px;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            padding: 0.75rem 1.5rem;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #45a049;
        }
        .button.failure {
            background-color: #F44336;
        }
        .button.failure:hover {
            background-color: #d32f2f;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon ${iconClass}">${icon}</div>
        <h1>${header}</h1>
        <p>${message}</p>
        <div class="details">
            ${details}
        </div>
        <a href="https://wwwfind-house.vercel.app/payment" class="${buttonClass}">${buttonText}</a>
    </div>
</body>
</html>`;
});
const CasOnDeliveryStatusUpdate = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    let result;
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const paymentData = yield payment_model_1.Payment.findOne({
        transactionId: payload.transactionId,
    });
    const productIds = paymentData === null || paymentData === void 0 ? void 0 : paymentData.products;
    console.log("productIds", productIds);
    if (payload.status === "Paid") {
        if (productIds && productIds.length > 0) {
            const updatedUser = yield user_model_1.User.findByIdAndUpdate(paymentData.customerId, {
                $pull: {
                    favoriteProducts: { $in: productIds }, // Remove matching productIds
                },
            }, { new: true });
            console.log("Updated User:", updatedUser);
            // Step 2: Update each product's favoriteBy array
            const updateProductPromises = productIds.map((productId) => __awaiter(void 0, void 0, void 0, function* () {
                return product_model_1.Product.findByIdAndUpdate(productId, {
                    $pull: {
                        favoriteBy: paymentData.customerId,
                    },
                }, { new: true });
            }));
            // Execute all update operations
            const updatedProducts = yield Promise.all(updateProductPromises);
            console.log("Updated Products:", updatedProducts);
        }
        else {
            console.log("No products to remove from favoriteProducts.");
        }
        result = yield payment_model_1.Payment.findOneAndUpdate({ transactionId: payload.transactionId }, { status: "Paid" }, { new: true });
    }
    if (payload.status === "Canceled") {
        result = yield payment_model_1.Payment.findOneAndUpdate({ transactionId: payload.transactionId }, { status: "Canceled" }, { new: true });
    }
    return result;
});
const getMyPaymentsData = (query, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentQueryBuilder = new QueryBuilder_1.default(payment_model_1.Payment.find({ customerId }).populate("customerId").populate("products"), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield paymentQueryBuilder.modelQuery;
    const meta = yield paymentQueryBuilder.countTotal();
    return {
        meta,
        result,
    };
});
const getAllPaymentsDatForAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.find().populate("user");
    return result;
});
const getAllPayments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentQueryBuilder = new QueryBuilder_1.default(payment_model_1.Payment.find().populate("customerId").populate("products"), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield paymentQueryBuilder.modelQuery;
    const meta = yield paymentQueryBuilder.countTotal();
    return {
        meta,
        result,
    };
});
const updatePaymentStatus = (paymentId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.findByIdAndUpdate(paymentId, { status: status }, { new: true });
    return result;
});
exports.PaymentService = {
    createPayment,
    cashOnDeliveryPayment,
    paymentConformationIntoDB,
    CasOnDeliveryStatusUpdate,
    getMyPaymentsData,
    getAllPaymentsDatForAnalytics,
    getAllPayments,
    updatePaymentStatus
};
