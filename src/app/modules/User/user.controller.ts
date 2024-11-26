import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const findUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.findUserById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsers(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users are retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  console.log("Request body received:", req.body); // Debug log
  const result = await UserService.updateUserById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is updated successfully",
    data: result,
  });
});

const deleteUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteUserById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is deleted successfully",
    data: result && null,
  });
});

const updateRole = catchAsync(async (req, res) => {
  const { id, role } = req.params;
  const result = await UserService.updateRole(
    id,
    role as "admin" | "agent" | "user",
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated to agent successfully",
    data: result,
  });
});

export const UserController = {
  findUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  updateRole,
};
