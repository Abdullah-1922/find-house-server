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
exports.AuthServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../User/user.model");
const auth_utils_1 = require("./auth.utils"); // Utility to create JWT
const auth_model_1 = __importDefault(require("./auth.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendMail_1 = __importDefault(require("../../utils/sendMail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const http_status_1 = __importDefault(require("http-status"));
// Generate access and refresh tokens
const generateTokens = (user) => {
    const jwtPayload = {
        email: (user === null || user === void 0 ? void 0 : user.email) || "",
        role: (user === null || user === void 0 ? void 0 : user.role) || "user",
        _id: user._id.toString(),
    };
    if ((user === null || user === void 0 ? void 0 : user.facebookId) || (user === null || user === void 0 ? void 0 : user.twitterId)) {
        jwtPayload.socialId = user.facebookId || user.twitterId;
    }
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_EXPIRES_IN);
    return { accessToken, refreshToken };
};
// Login user
const loginUser = (payload, provider) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    if (provider === "email") {
        user = yield auth_model_1.default.findOne({ email: payload.email });
        if (!user)
            throw new AppError_1.default(404, "User not found");
        if (!(payload === null || payload === void 0 ? void 0 : payload.password))
            throw new AppError_1.default(400, "Password is required");
        const isPasswordValid = yield bcryptjs_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordValid)
            throw new AppError_1.default(400, "Password is incorrect");
        const tokens = generateTokens(user);
        user = yield user_model_1.User.findOne({ email: payload.email }).populate("auth");
        return Object.assign(Object.assign({}, tokens), { user });
    }
});
// Register user by email
const registerByEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield auth_model_1.default.findOne({ email: payload.email });
    if (existingUser)
        throw new AppError_1.default(400, "User already exists");
    const hashedPassword = yield bcryptjs_1.default.hash(payload.password, 12);
    const authData = yield auth_model_1.default.create(Object.assign(Object.assign({}, payload), { password: hashedPassword, provider: "email" }));
    const newUser = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { auth: authData._id }));
    const tokens = generateTokens(authData);
    return Object.assign(Object.assign({}, tokens), { user: newUser });
});
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.default.findOne({ email });
    if (!user)
        throw new AppError_1.default(404, "User not found");
    // Generate a secure token
    const tokens = generateTokens(user);
    // Generate the reset URL
    const resetUrl = `${config_1.default.frontend_local_url}/reset-password?email=${user === null || user === void 0 ? void 0 : user.email}&token=${tokens === null || tokens === void 0 ? void 0 : tokens.accessToken}`;
    // Send email
    yield (0, sendMail_1.default)({
        to: email,
        subject: "Password Change Request",
        resetLink: resetUrl,
    });
    return { message: "Password reset token sent to your email" };
});
// reset password
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const user = yield user_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found!");
    }
    // Check if token is valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const isUserExists = yield auth_model_1.default.findById(decoded === null || decoded === void 0 ? void 0 : decoded._id);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is forbidden!");
    }
    const newHashPassword = yield bcryptjs_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield auth_model_1.default.findOneAndUpdate({ _id: decoded._id, role: decoded.role }, {
        password: newHashPassword,
    }, { new: true });
    return result;
});
// change password
const changePassword = (accessToken, currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Decode the accessToken
        const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const userId = decoded._id;
        // Find the user by ID
        const user = yield auth_model_1.default.findById(userId);
        if (!user) {
            throw new AppError_1.default(404, "User not found");
        }
        // Compare the provided currentPassword with the hashed password in the database
        const isPasswordMatch = yield bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            throw new AppError_1.default(400, "Incorrect current password");
        }
        // Hash the new password and update the user's password
        user.password = yield bcryptjs_1.default.hash(newPassword, 12);
        yield user.save();
        return { message: "Password changed successfully" };
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new AppError_1.default(401, "Invalid or expired access token");
        }
        throw error; // Re-throw other errors
    }
});
exports.AuthServices = {
    loginUser,
    registerByEmail,
    forgotPassword,
    resetPassword,
    changePassword,
};
