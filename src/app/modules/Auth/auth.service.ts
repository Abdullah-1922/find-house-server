/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../User/user.model";
import { TAuth } from "./auth.interface";
import bcryptjs from "bcryptjs";
import { createToken } from "./auth.utils"; // Utility to create JWT
import Auth from "./auth.model";
import AppError from "../../errors/AppError";

interface JwtPayload {
  email: string;
  role: string;
  _id: string;
  socialId?: string; // Optional property
}

const generateTokens = (user: any) => {
  const jwtPayload: JwtPayload = {
    email: user?.email || "",
    role: "user",
    _id: user._id.toString(),
  };

  // Add socialId to payload if it exists
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

  if (provider === "facebook") {
    if (!payload.facebookId) throw new AppError(400, "Facebook ID is required");

    user = await Auth.findOne({ facebookId: payload.facebookId });
    if (!user) user = await registerSocialUser(payload, "facebook");
    const tokens = generateTokens(user);
    return { ...tokens, user };
  }

  if (provider === "twitter") {
    if (!payload.twitterId) throw new AppError(400, "Twitter ID is required");

    user = await Auth.findOne({ twitterId: payload.twitterId });
    if (!user) user = await registerSocialUser(payload, "twitter");
    const tokens = generateTokens(user);
    return { ...tokens, user };
  }
};

const registerSocialUser = async (
  userData: TAuth,
  provider: "facebook" | "twitter",
) => {
  const authData = await Auth.create({
    ...userData,
    provider,
    [provider === "facebook" ? "facebookId" : "twitterId"]:
      userData[provider === "facebook" ? "facebookId" : "twitterId"],
  });

  await User.create({
    ...userData,
    auth: authData._id,
  });

  return authData;
};

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

export const AuthServices = {
  loginUser,
  registerByEmail,
};
