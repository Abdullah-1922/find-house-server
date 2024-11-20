import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginEmailUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body, "email");

  const { refreshToken, accessToken, user } = result;

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

  const { refreshToken, accessToken, user } = result;

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

  const { refreshToken, accessToken, user } = result;

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

// const refreshToken = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies;
//   const result = await AuthServices.refreshToken(refreshToken);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Access token is retrieved successfully!',
//     data: result,
//   });
// });
const registerByEmail = catchAsync(async (req, res) => {
  const result = await AuthServices.registerByEmail(req.body);
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const AuthControllers = {
  loginEmailUser,
  loginFacebookUser,
  // refreshToken,
  registerByEmail,
  loginTwitterUser,
};
