import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ContactUsServices } from "./contactUs.service";
import sendResponse from "../../utils/sendResponse";

const createContactUs = catchAsync(async (req, res) => {
  const result = ContactUsServices.createContactUs(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "contact Us form created successfully",
    data: result,
  });
});
const getAllContactUs = catchAsync(async (req, res) => {
  const result = await ContactUsServices.getAllContactUs(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contacts retrieved successfully",
    data: result,
  });
});

const getContactUsById = catchAsync(async (req, res) => {
  const result = await ContactUsServices.getContactUsById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact retrieved successfully",
    data: result,
  });
});

const updateContactUsById = catchAsync(async (req, res) => {
  const result = await ContactUsServices.updateContactUsById(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact updated successfully",
    data: result,
  });
});

const deleteContactUsById = catchAsync(async (req, res) => {
  const result = await ContactUsServices.deleteContactUsById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact deleted successfully",
    data: result,
  });
});

export const ContactUsController = {
  createContactUs,
  getAllContactUs,
  getContactUsById,
  updateContactUsById,
  deleteContactUsById,
};
