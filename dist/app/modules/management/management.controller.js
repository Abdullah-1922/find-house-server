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
exports.ManagementControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const management_service_1 = require("./management.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield management_service_1.ManagementServices.createManagement(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Management is created successfully",
        data: result,
    });
}));
// get all management
const getAllManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { result, meta } = yield management_service_1.ManagementServices.getAllManagement(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Management retrieved successfully",
        data: result,
        meta: meta,
    });
}));
// delete management using id
const deleteManagementWithId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const managementId = req.params.managementId;
    const result = yield management_service_1.ManagementServices.deleteSingleManagement(managementId);
    res.status(200).json({
        success: true,
        message: "Management data deleted successfully!",
        data: result,
    });
}));
const getSingleManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const managementId = req.params.managementId;
    const result = yield management_service_1.ManagementServices.getSingleManagement(managementId);
    res.status(200).json({
        success: true,
        message: "Management retrieved successfully!",
        data: result,
    });
}));
const updateManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const managementId = req.params.managementId;
    const result = yield management_service_1.ManagementServices.updateManagement(managementId, req.body);
    res.status(200).json({
        success: true,
        message: "Management updated successfully!",
        data: result,
    });
}));
exports.ManagementControllers = {
    createManagement,
    getAllManagement,
    deleteManagementWithId,
    getSingleManagement,
    updateManagement,
};
