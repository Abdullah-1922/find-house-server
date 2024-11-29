"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryControllers = void 0;
// inquiry.controller.ts
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync")); // Assuming you have a catchAsync utility
const sendResponse_1 = __importDefault(require("../../utils/sendResponse")); // Assuming you have a sendResponse utility
const inquiry_service_1 = require("./inquiry.service");
const createInquiry = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield inquiry_service_1.InquiryServices.createInquiry(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Inquiry created successfully",
        data: result,
    });
}));
const getAllInquiries = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inquiries = yield inquiry_service_1.InquiryServices.getAllInquiries(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Inquiries retrieved successfully",
        data: inquiries,
    });
}));
const getSingleInquiry = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inquiryId = req.params.inquiryId;
    const inquiry = yield inquiry_service_1.InquiryServices.getSingleInquiry(inquiryId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Inquiry retrieved successfully",
        data: inquiry,
    });
}));
const deleteInquiry = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inquiryId = req.params.inquiryId;
    const result = yield inquiry_service_1.InquiryServices.deleteInquiry(inquiryId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Inquiry deleted successfully",
        data: result,
    });
}));
const inquiryByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const inquiries = yield inquiry_service_1.InquiryServices.getInquiriesByUser(userId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Inquiries retrieved successfully (By user)",
        data: inquiries,
    });
}));
const inquiryByAgent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agentId = req.params.agentId;
    const inquiries = yield inquiry_service_1.InquiryServices.getInquiriesByAgent(agentId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Inquiries retrieved successfully (By agent)",
        data: inquiries,
    });
}));
const updateInquiry = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inquiryId = req.params.inquiryId;
    const result = yield inquiry_service_1.InquiryServices.updateInquiry(inquiryId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Inquiry updated successfully",
        data: result,
    });
}));
exports.InquiryControllers = {
    createInquiry,
    getAllInquiries,
    getSingleInquiry,
    deleteInquiry,
    inquiryByUser,
    inquiryByAgent,
    updateInquiry
};
