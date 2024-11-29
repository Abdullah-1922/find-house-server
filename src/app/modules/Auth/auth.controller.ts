import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import AppError from "../../errors/AppError";
import config from "../../config";

const loginEmailUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body, "email");

  const { refreshToken, accessToken, user }: any = result;

  // res.cookie("accessToken", accessToken, {
  //   secure: config.NODE_ENV === "production",
  //   httpOnly: true,
  //   sameSite: "lax",
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: {
      accessToken,
      refreshToken,
      user,
    },
  });
});
const loginFacebookUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body, "facebook");

  const { refreshToken, accessToken, user }: any = result;

  // res.cookie("accessToken", accessToken, {
  //   secure: config.NODE_ENV === "production",
  //   httpOnly: true,
  //   sameSite: "lax",
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: {
      accessToken,
      refreshToken,
      user,
    },
  });
});

const loginTwitterUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body, "twitter");

  const { refreshToken, accessToken, user }: any = result;
  // res.cookie("accessToken", accessToken, {
  //   secure: config.NODE_ENV === "production",
  //   httpOnly: true,
  //   sameSite: "lax",
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: {
      accessToken,
      refreshToken,
      user,
    },
  });
});

const registerByEmail = catchAsync(async (req, res) => {
  const result = await AuthServices.registerByEmail(req.body);

  // res.cookie("accessToken", result?.accessToken, {
  //   secure: config.NODE_ENV === "production",
  //   httpOnly: true,
  //   sameSite: "lax",
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

// Forgot Password Controller
const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await AuthServices.forgotPassword(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result.message,
  });
});

// Reset Password
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  console.log("token", token);
  const result = await AuthServices.resetPassword(req.body, token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successful!",
    data: result,
  });
});

// change Password Controller
const changePassword = catchAsync(async (req, res) => {
  const { token, currentPassword, newPassword } = req.body;

  console.log(req.body);

  if (!token || !currentPassword || !newPassword) {
    throw new AppError(400, "All fields are required");
  }

  const result = await AuthServices.changePassword(
    token,
    currentPassword,
    newPassword,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
  });
});

export const AuthControllers = {
  loginEmailUser,
  loginFacebookUser,
  registerByEmail,
  loginTwitterUser,
  forgotPassword,
  resetPassword,
  changePassword,
};
