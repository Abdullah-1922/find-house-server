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

export const AuthValidation = {
  loginEmailValidationSchema,
  refreshTokenValidationSchema,
  registerEmailUserValidationSchema,
  loginTwitterValidationSchema,
  loginFacebookValidationSchema,
};
