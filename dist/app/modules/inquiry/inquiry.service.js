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
exports.InquiryServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../User/user.model");
const inquiry_model_1 = require("./inquiry.model");
const createInquiry = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.agent || !payload.user) {
        throw new AppError_1.default(400, "Agent and user are required");
    }
    const user = yield user_model_1.User.findById(payload.user);
    if (!user) {
        throw new AppError_1.default(400, "User not found");
    }
    const agent = yield user_model_1.User.findById(payload.agent);
    if (!agent) {
        throw new AppError_1.default(400, "Agent not found");
    }
    const newInquiry = yield inquiry_model_1.Inquiry.create(payload);
    return newInquiry;
});
const getAllInquiries = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const inquiryQuery = new QueryBuilder_1.default(inquiry_model_1.Inquiry.find().populate("agent user"), query)
        .search(["message", "email"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield inquiryQuery.modelQuery;
    const meta = yield inquiryQuery.countTotal();
    return { result, meta };
});
const getSingleInquiry = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const inquiry = yield inquiry_model_1.Inquiry.findById(id).populate("agent user");
    if (!inquiry) {
        throw new AppError_1.default(404, "Inquiry not found");
    }
    return inquiry;
});
const deleteInquiry = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const inquiry = yield inquiry_model_1.Inquiry.findByIdAndDelete(id);
    if (!inquiry) {
        throw new AppError_1.default(404, "Inquiry not found");
    }
    return inquiry;
});
const getInquiriesByUser = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const inquiryQuery = new QueryBuilder_1.default(inquiry_model_1.Inquiry.find({ user: userId }).populate("agent user"), query)
        .search(["message", "email"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield inquiryQuery.modelQuery;
    const meta = yield inquiryQuery.countTotal();
    return { result, meta };
});
const getInquiriesByAgent = (agentId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const inquiryQuery = new QueryBuilder_1.default(inquiry_model_1.Inquiry.find({ agent: agentId }).populate("agent user"), query)
        .search(["message", "email"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield inquiryQuery.modelQuery;
    const meta = yield inquiryQuery.countTotal();
    return { result, meta };
});
const updateInquiry = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const inquiry = yield inquiry_model_1.Inquiry.findByIdAndUpdate(id, payload, { new: true });
    if (!inquiry) {
        throw new AppError_1.default(404, "Inquiry not found");
    }
    return inquiry;
});
exports.InquiryServices = {
    createInquiry,
    getAllInquiries,
    getSingleInquiry,
    deleteInquiry,
    getInquiriesByUser,
    getInquiriesByAgent,
    updateInquiry,
};
