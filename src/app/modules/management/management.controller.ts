import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ManagementServices } from "./management.service";
import sendResponse from "../../utils/sendResponse";

const createManagement = catchAsync(async (req, res) => {
  const result = await ManagementServices.createManagement(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Management is created successfully",
    data: result,
  });
});

// get all management
const getAllManagement = catchAsync(async (req, res) => {
  const { result, meta } = await ManagementServices.getAllManagement(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Management retrieved successfully",
    data: result,
    meta: meta,
  });
});

// delete management using id
const deleteManagementWithId = catchAsync(async (req, res) => {
  const managementId = req.params.managementId;

  const result = await ManagementServices.deleteSingleManagement(managementId);
  res.status(200).json({
    success: true,
    message: "Management data deleted successfully!",
    data: result,
  });
});

const getSingleManagement = catchAsync(async (req, res) => {
  const managementId = req.params.managementId;
  const result = await ManagementServices.getSingleManagement(managementId);
  res.status(200).json({
    success: true,
    message: "Management retrieved successfully!",
    data: result,
  });
});

const updateManagement = catchAsync(async (req, res) => {
  const managementId = req.params.managementId;
  const result = await ManagementServices.updateManagement(
    managementId,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: "Management updated successfully!",
    data: result,
  });
});

export const ManagementControllers = {
  createManagement,
  getAllManagement,
  deleteManagementWithId,
  getSingleManagement,
  updateManagement,
};
