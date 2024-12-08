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
exports.PopularPlacesController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const popularPlaces_service_1 = require("./popularPlaces.service");
const createPopularPlaceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPlace = yield popularPlaces_service_1.popularPlacesService.createPopularPlace(req.body);
    (0, sendResponse_1.default)(res, {
        data: newPlace,
        message: "Popular place created successfully",
        statusCode: 201,
        success: true,
    });
}));
const getAllPopularPlacesController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { result, total } = yield popularPlaces_service_1.popularPlacesService.getAllPopularPlaces(req.query);
    (0, sendResponse_1.default)(res, {
        data: result,
        meta: total,
        message: "Popular places fetched successfully",
        statusCode: 200,
        success: true,
    });
}));
const getPopularPlaceByIdController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield popularPlaces_service_1.popularPlacesService.getPopularPlaceById(req.params.id);
    if (!place) {
        (0, sendResponse_1.default)(res, {
            message: "Popular place not found",
            statusCode: 404,
            success: false,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        data: place,
        message: "Popular place fetched successfully",
        statusCode: 200,
        success: true,
    });
}));
const updatePopularPlaceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPlace = yield popularPlaces_service_1.popularPlacesService.updatePopularPlace(req.params.id, req.body);
    if (!updatedPlace) {
        (0, sendResponse_1.default)(res, {
            message: "Popular place not found",
            statusCode: 404,
            success: false,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        data: updatedPlace,
        message: "Popular place updated successfully",
        statusCode: 200,
        success: true,
    });
}));
const deletePopularPlaceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield popularPlaces_service_1.popularPlacesService.deletePopularPlace(req.params.id);
    if (!deleted) {
        (0, sendResponse_1.default)(res, {
            message: "Popular place not found",
            statusCode: 404,
            success: false,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        message: "Popular place deleted successfully",
        statusCode: 204,
        success: true,
    });
}));
exports.PopularPlacesController = {
    createPopularPlaceController,
    getAllPopularPlacesController,
    getPopularPlaceByIdController,
    updatePopularPlaceController,
    deletePopularPlaceController,
};
