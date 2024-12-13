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
exports.AuthControllers = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const config_1 = __importDefault(require("../../config"));
const loginEmailUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req.body, "email");
    res.cookie("accessToken", result === null || result === void 0 ? void 0 : result.accessToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    });
    const { refreshToken, accessToken, user } = result;
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is logged in successfully!",
        data: {
            accessToken,
            refreshToken,
            user,
        },
    });
}));
const loginFacebookUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req.body, "facebook");
    res.cookie("accessToken", result === null || result === void 0 ? void 0 : result.accessToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    });
    const { refreshToken, accessToken, user } = result;
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is logged in successfully!",
        data: {
            accessToken,
            refreshToken,
            user,
        },
    });
}));
const loginGoogleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req.body, "google");
    res.cookie("accessToken", result === null || result === void 0 ? void 0 : result.accessToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    });
    const { refreshToken, accessToken, user } = result;
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is logged in successfully!",
        data: {
            accessToken,
            refreshToken,
            user,
        },
    });
}));
const loginTwitterUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req.body, "twitter");
    res.cookie("accessToken", result === null || result === void 0 ? void 0 : result.accessToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    });
    const { refreshToken, accessToken, user } = result;
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is logged in successfully!",
        data: {
            accessToken,
            refreshToken,
            user,
        },
    });
}));
const registerByEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.registerByEmail(req.body);
    res.cookie("accessToken", result === null || result === void 0 ? void 0 : result.accessToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User registered successfully",
        data: result,
    });
}));
// Forgot Password Controller
const forgotPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield auth_service_1.AuthServices.forgotPassword(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: result.message,
    });
}));
// Reset Password
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield auth_service_1.AuthServices.resetPassword(req.body, token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset successful!",
        data: result,
    });
}));
// change Password Controller
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, currentPassword, newPassword } = req.body;
    if (!token || !currentPassword || !newPassword) {
        throw new AppError_1.default(400, "All fields are required");
    }
    const result = yield auth_service_1.AuthServices.changePassword(token, currentPassword, newPassword);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: result.message,
    });
}));
exports.AuthControllers = {
    loginEmailUser,
    loginFacebookUser,
    registerByEmail,
    loginTwitterUser,
    forgotPassword,
    resetPassword,
    changePassword,
    loginGoogleUser
};
