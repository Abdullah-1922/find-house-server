import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PropertyServices } from "./property.service";

// Controller to create a new property
const createProperty = catchAsync(async (req, res) => {
  const result = await PropertyServices.createProperty(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Property created successfully",
    data: result,
  });
});

// Controller to get all properties with filters
const getAllProperties = catchAsync(async (req, res) => {
  const { result, meta } = await PropertyServices.getAllProperties(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Properties retrieved successfully",
    meta: meta,
    data: result,
  });
});

// Controller to get a single property by ID
const getSingleProperty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PropertyServices.getSingleProperty(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property retrieved successfully",
    data: result,
  });
});

// Controller to update a property by ID
const updateProperty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PropertyServices.updateProperty(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property updated successfully",
    data: result,
  });
});

// Controller to delete a property by ID
const deleteProperty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PropertyServices.deleteProperty(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property deleted successfully",
    data: result && null,
  });
});

const addPropertyFavorite = catchAsync(async (req, res) => {
  const { propertyId, userId } = req.body;
  const result = await PropertyServices.addPropertyFavorite(propertyId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property added to favorites successfully",
    data: result,
  });
});

const removePropertyFavorite = catchAsync(async (req, res) => {
  const { propertyId, userId } = req.body;
  const result = await PropertyServices.removePropertyFavorite(
    propertyId,
    userId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property removed from favorites successfully",
    data: result,
  });
});

export const PropertyControllers = {
  createProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  addPropertyFavorite,
  removePropertyFavorite,
};
