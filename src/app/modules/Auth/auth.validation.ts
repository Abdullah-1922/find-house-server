import { z } from "zod";

const loginEmailValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});
const loginFacebookValidationSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    secondName: z.string().optional(),
    image: z.string().optional(),
    facebookId: z.string(),
  }),
});
const loginTwitterValidationSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    secondName: z.string().optional(),
    image: z.string().optional(),
    twitterId: z.string(),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required!",
    }),
  }),
});

export const registerEmailUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string(),
    secondName: z.string(),
    email: z.string().email(),
    password: z.string(),
    image: z.string().optional(),
  }),
});

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    token: z.string({ required_error: "Change token is required" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    currentPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  }),
});

export const AuthValidation = {
  loginEmailValidationSchema,
  refreshTokenValidationSchema,
  registerEmailUserValidationSchema,
  loginTwitterValidationSchema,
  loginFacebookValidationSchema,
  changePasswordValidationSchema,
  forgotPasswordValidationSchema,
};
