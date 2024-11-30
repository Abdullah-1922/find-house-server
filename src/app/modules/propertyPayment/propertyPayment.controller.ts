import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PropertyPaymentService } from "./propertyPayment.service";

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const paymentData = req.body;
  const payment = await PropertyPaymentService.createPayment(paymentData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Payment created successfully",
    data: payment,
  });
});

const getPayments = catchAsync(async (req: Request, res: Response) => {
  const {payments,meta} = await PropertyPaymentService.getPayments(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payments retrieved successfully",
    data: payments,
    meta:meta
  });
});

const getPaymentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payment = await PropertyPaymentService.getPaymentById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment retrieved successfully",
    data: payment,
  });
});
const updatePropertyPayment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const paymentData = req.body;
    const payment = await PropertyPaymentService.updatePaymentPayment(
      id,
      paymentData,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment updated successfully",
      data: payment,
    });
  },
);
const getPaymentsForAgent = catchAsync(async (req: Request, res: Response) => {
  const {payments,meta} = await PropertyPaymentService.getPaymentsForAgent(req.params.userId,req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payments retrieved successfully (Agent)",
    data: payments,
    meta:meta
  });
});

export const PropertyPaymentController = {
  createPayment,
  getPayments,
  getPaymentById,
  updatePropertyPayment,
  getPaymentsForAgent
};
