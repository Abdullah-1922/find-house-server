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
exports.PropertyControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const property_service_1 = require("./property.service");
// Controller to create a new property
const createProperty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield property_service_1.PropertyServices.createProperty(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Property created successfully",
        data: result,
    });
}));
// Controller to get all properties with filters
const getAllProperties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { result, meta } = yield property_service_1.PropertyServices.getAllProperties(req.query);
    console.log("req.query", req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Properties retrieved successfully",
        meta: meta,
        data: result,
    });
}));
const getMyAllProperties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { result, meta } = yield property_service_1.PropertyServices.getMyAllProperties(req.query, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Properties retrieved successfully",
        meta: meta,
        data: result,
    });
}));
// Controller to get a single property by ID
const getSingleProperty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield property_service_1.PropertyServices.getSingleProperty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Property retrieved successfully",
        data: result,
    });
}));
// Controller to get a My property by ID
const getMyProperties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield property_service_1.PropertyServices.getMyProperties(userId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Property retrieved successfully (My Property)",
        data: result,
    });
}));
// Controller to update a property by ID
const updateProperty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield property_service_1.PropertyServices.updateProperty(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Property updated successfully",
        data: result,
    });
}));
// Controller to delete a property by ID
const deleteProperty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield property_service_1.PropertyServices.deleteProperty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Property deleted successfully",
        data: result && null,
    });
}));
const addPropertyFavorite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId, userId } = req.body;
    const result = yield property_service_1.PropertyServices.addPropertyFavorite(propertyId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Property added to favorites successfully",
        data: result,
    });
}));
const removePropertyFavorite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId, userId } = req.body;
    const result = yield property_service_1.PropertyServices.removePropertyFavorite(propertyId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Property removed from favorites successfully",
        data: result,
    });
}));
const getMyFavoriteProperties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield property_service_1.PropertyServices.getMyFavoriteProperties(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Favorites properties retrieved successfully",
        data: result,
    });
}));
exports.PropertyControllers = {
    createProperty,
    getAllProperties,
    getMyAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty,
    addPropertyFavorite,
    removePropertyFavorite,
    getMyFavoriteProperties,
    getMyProperties
};
