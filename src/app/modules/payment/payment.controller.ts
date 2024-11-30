import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const createPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.createPayment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your payment successful",
    data: result,
  });
});

const cashOnDeliveryPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.cashOnDeliveryPayment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your order successful",
    data: result,
  });
});

const paymentConformation = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query;

  const result = await PaymentService.paymentConformationIntoDB(
    transactionId as string,
    status as string,
  );

  res.send(result);
});

const CasOnDeliveryStatusUpdate = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await PaymentService.CasOnDeliveryStatusUpdate(
    req.body,
    userId as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cash on delivery status updated successfully",
    data: result,
  });
});

const getMyPaymentsData = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { result, meta } = await PaymentService.getMyPaymentsData(
    req.query,
    userId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment data retrieved successfully",
    meta: meta,
    data: result,
  });
});
const getAllPaymentsData = catchAsync(async (req, res) => {
  const { gatewayName } = req.params;
  const { result, meta } = await PaymentService.getAllPaymentsData(
    req.query,
    gatewayName,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment data retrieved successfully",
    meta: meta,
    data: result,
  });
});

const getAllPaymentsDatForAnalytics = catchAsync(async (req, res) => {
  const result = await PaymentService.getAllPaymentsDatForAnalytics();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment data retrieved successfully",
    data: result,
  });
});

const getAllPayments = catchAsync(async (req, res) => {
  const query = req.body.query
  const result = await PaymentService.getAllPayments(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment data retrieved successfully",
    data: result,
  });
});

const updatePaymentStatus = catchAsync(async (req, res) => {
  const id = req.params.id
  const status = req.body.status
  const result = await PaymentService.updatePaymentStatus(id, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment status update successfully",
    data: result,
  });
});

export const PaymentController = {
  createPayment,
  cashOnDeliveryPayment,
  paymentConformation,
  CasOnDeliveryStatusUpdate,
  getMyPaymentsData,
  getAllPaymentsData,
  getAllPaymentsDatForAnalytics,
  getAllPayments,
  updatePaymentStatus
};
