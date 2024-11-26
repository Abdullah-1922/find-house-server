import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { User } from "../User/user.model";
import { TAuth } from "./auth.interface";
import { createToken } from "./auth.utils"; // Utility to create JWT
import Auth from "./auth.model";
import AppError from "../../errors/AppError";
import sendEmail from "../../utils/sendMail";
import jwt from "jsonwebtoken";

interface JwtPayload {
  email: string;
  role: string;
  _id: string;
  socialId?: string; // Optional property
}

// Generate access and refresh tokens
const generateTokens = (user: any) => {
  const jwtPayload: JwtPayload = {
    email: user?.email || "",
    role: "user",
    _id: user._id.toString(),
  };

  if (user?.facebookId || user?.twitterId) {
    jwtPayload.socialId = user.facebookId || user.twitterId;
  }

  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    process.env.JWT_ACCESS_EXPIRES_IN as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    process.env.JWT_REFRESH_SECRET as string,
    process.env.JWT_REFRESH_EXPIRES_IN as string,
  );

  return { accessToken, refreshToken };
};

// Login user
const loginUser = async (payload: TAuth, provider?: string) => {
  let user;

  if (provider === "email") {
    user = await Auth.findOne({ email: payload.email });
    if (!user) throw new AppError(404, "User not found");

    if (!payload?.password) throw new AppError(400, "Password is required");

    const isPasswordValid = await bcryptjs.compare(
      payload?.password,
      user?.password as string,
    );
    if (!isPasswordValid) throw new AppError(400, "Password is incorrect");

    const tokens = generateTokens(user);
    user = await User.findOne({ email: payload.email }).populate("auth");
    return { ...tokens, user };
  }
};

// Register user by email
const registerByEmail = async (payload: TAuth) => {
  const existingUser = await Auth.findOne({ email: payload.email });
  if (existingUser) throw new AppError(400, "User already exists");

  const hashedPassword = await bcryptjs.hash(payload.password as string, 12);
  const authData = await Auth.create({
    ...payload,
    password: hashedPassword,
    provider: "email",
  });
  const newUser = await User.create({ ...payload, auth: authData._id });

  const tokens = generateTokens(authData);

  return { ...tokens, user: newUser };
};

// Forgot password
// const forgotPassword = async (email: string) => {
//   const user = await Auth.findOne({ email });
//   if (!user) throw new AppError(404, "User not found");

//   const changeToken = crypto.randomBytes(32).toString("hex");

//   user.passwordchangeToken = crypto
//     .createHash("sha256")
//     .update(changeToken)
//     .digest("hex");
//   user.passwordchangeExpires = Date.now() + 10 * 60 * 1000;

//   await user.save({ validateBeforeSave: false });

//   const changeUrl = `${process.env.FRONTEND_URL}/change-password/${changeToken}`;
//   const message = `You requested to change your password. Use this link: ${changeUrl}. This link is valid for 10 minutes.`;

//   await sendEmail({
//     to: email,
//     subject: "Password change Request",
//     text: message,
//   });

//   return { message: "Password change token sent to your email" };
// };

// change password
const changePassword = async (
  accessToken: string,
  currentPassword: string,
  newPassword: string,
) => {
  try {
    // Decode the accessToken
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string,
    );
    const userId = (decoded as any)._id;

    // Find the user by ID
    const user = await Auth.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    // Compare the provided currentPassword with the hashed password in the database
    const isPasswordMatch = await bcryptjs.compare(
      currentPassword,
      user.password as string,
    );
    if (!isPasswordMatch) {
      throw new AppError(400, "Incorrect current password");
    }

    // Hash the new password and update the user's password
    user.password = await bcryptjs.hash(newPassword, 12);
    await user.save();

    return { message: "Password changed successfully" };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError(401, "Invalid or expired access token");
    }
    throw error; // Re-throw other errors
  }
};

export const AuthServices = {
  loginUser,
  registerByEmail,
  // forgotPassword,
  changePassword,
};
