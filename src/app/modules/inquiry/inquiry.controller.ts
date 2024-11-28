// inquiry.controller.ts
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync"; // Assuming you have a catchAsync utility

import sendResponse from "../../utils/sendResponse"; // Assuming you have a sendResponse utility
import { InquiryServices } from "./inquiry.service";

const createInquiry = catchAsync(async (req, res) => {
  const result = await InquiryServices.createInquiry(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Inquiry created successfully",
    data: result,
  });
});

const getAllInquiries = catchAsync(async (req, res) => {
  const inquiries = await InquiryServices.getAllInquiries(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Inquiries retrieved successfully",
    data: inquiries,
  });
});

const getSingleInquiry = catchAsync(async (req, res) => {
  const inquiryId = req.params.inquiryId;
  const inquiry = await InquiryServices.getSingleInquiry(inquiryId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Inquiry retrieved successfully",
    data: inquiry,
  });
});

const deleteInquiry = catchAsync(async (req, res) => {
  const inquiryId = req.params.inquiryId;
  const result = await InquiryServices.deleteInquiry(inquiryId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Inquiry deleted successfully",
    data: result,
  });
});
const inquiryByUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const inquiries = await InquiryServices.getInquiriesByUser(userId, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Inquiries retrieved successfully (By user)",
    data: inquiries,
  });
});
const inquiryByAgent = catchAsync(async (req, res) => {
  const agentId = req.params.agentId;
  const inquiries = await InquiryServices.getInquiriesByAgent(
    agentId,
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Inquiries retrieved successfully (By agent)",
    data: inquiries,
  });
});
const updateInquiry = catchAsync(async (req, res) => {
  const inquiryId = req.params.inquiryId;
  const result = await InquiryServices.updateInquiry(inquiryId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Inquiry updated successfully",
    data: result,
  });
});
export const InquiryControllers = {
  createInquiry,
  getAllInquiries,
  getSingleInquiry,
  deleteInquiry,
  inquiryByUser,
  inquiryByAgent,
  updateInquiry
};
