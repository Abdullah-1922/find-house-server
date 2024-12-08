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
exports.ManagementServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const management_model_1 = require("./management.model");
/* eslint-disable @typescript-eslint/no-explicit-any */
const createManagement = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const management = yield management_model_1.Management.findOne();
    if (management) {
        throw new AppError_1.default(400, "Management already exists");
    }
    const res = yield management_model_1.Management.create(payload);
    return res;
});
const getAllManagement = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const managementQuery = new QueryBuilder_1.default(management_model_1.Management.find(), query)
        .search(["aboutPage.title", "contactUsPage.title"])
        .sort()
        .fields()
        .filter()
        .paginate();
    const result = yield managementQuery.modelQuery;
    const meta = yield managementQuery.countTotal();
    return { result, meta };
});
const getSingleManagement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield management_model_1.Management.findById(id);
    if (!result) {
        throw new AppError_1.default(404, "Management entry not found");
    }
    return result;
});
const updateManagement = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const management = yield management_model_1.Management.findById(id);
    if (!management) {
        throw new AppError_1.default(404, "Management id Invalid");
    }
    // Merge the existing management data with the new payload
    const updatedData = {};
    Object.keys(payload).forEach((key) => {
        const value = payload[key];
        if (typeof value === "object" && !Array.isArray(value)) {
            // Flatten nested objects using dot notation
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                updatedData[`${key}.${nestedKey}`] = nestedValue;
            });
        }
        else {
            // Directly add non-nested fields
            updatedData[key] = value;
        }
    });
    const result = yield management_model_1.Management.findByIdAndUpdate(id, updatedData, {
        new: true,
    });
    return result;
});
const deleteSingleManagement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield management_model_1.Management.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(404, "Management entry not found");
    }
    return result;
});
exports.ManagementServices = {
    createManagement,
    getAllManagement,
    getSingleManagement,
    updateManagement,
    deleteSingleManagement,
};
