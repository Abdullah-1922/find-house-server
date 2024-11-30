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
exports.StatsController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const stats_services_1 = require("./stats.services");
const getAdminStats = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stats_services_1.StatsServices.getAdminStats();
    (0, sendResponse_1.default)(res, {
        data: result,
        message: "Stats fetched successfully (Admin)",
        statusCode: 200,
        success: true,
    });
}));
const getUserStats = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.userId);
    const result = yield stats_services_1.StatsServices.getUserStats(req.params.userId);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: "Stats fetched successfully (User)",
        statusCode: 200,
        success: true,
    });
}));
const getAgentStats = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stats_services_1.StatsServices.getAgentStats(req.params.userId);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: "Stats fetched successfully (Agent)",
        statusCode: 200,
        success: true,
    });
}));
exports.StatsController = {
    getAdminStats,
    getUserStats,
    getAgentStats
};
