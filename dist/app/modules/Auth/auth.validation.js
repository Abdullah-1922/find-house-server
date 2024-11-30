"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = exports.registerEmailUserValidationSchema = void 0;
const zod_1 = require("zod");
const loginEmailValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
});
const loginFacebookValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        secondName: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        facebookId: zod_1.z.string(),
    }),
});
const loginTwitterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        secondName: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        twitterId: zod_1.z.string(),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required!",
        }),
    }),
});
exports.registerEmailUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string(),
        secondName: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        image: zod_1.z.string().optional(),
    }),
});
const forgotPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: "Invalid email address" }),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        token: zod_1.z.string({ required_error: "Change token is required" }),
        newPassword: zod_1.z
            .string()
            .min(6, { message: "Password must be at least 6 characters" }),
        currentPassword: zod_1.z
            .string()
            .min(6, { message: "Password must be at least 6 characters" }),
    }),
});
exports.AuthValidation = {
    loginEmailValidationSchema,
    refreshTokenValidationSchema,
    registerEmailUserValidationSchema: exports.registerEmailUserValidationSchema,
    loginTwitterValidationSchema,
    loginFacebookValidationSchema,
    changePasswordValidationSchema,
    forgotPasswordValidationSchema,
};
