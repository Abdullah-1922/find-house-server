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
exports.ScheduleControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const schedule_service_1 = require("./schedule.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schedule_service_1.ScheduleServices.createSchedule(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Schedule created successfully",
        data: result,
    });
}));
const getAllSchedules = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { result, meta } = yield schedule_service_1.ScheduleServices.getAllSchedules(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedules retrieved successfully",
        data: result,
        meta,
    });
}));
const getSingleSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleId = req.params.scheduleId;
    const result = yield schedule_service_1.ScheduleServices.getSingleSchedule(scheduleId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule retrieved successfully",
        data: result,
    });
}));
const updateSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleId = req.params.scheduleId;
    const result = yield schedule_service_1.ScheduleServices.updateSchedule(scheduleId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule updated successfully",
        data: result,
    });
}));
const updateIsAccepted = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleId = req.params.scheduleId;
    const { isAccepted } = req.body;
    const result = yield schedule_service_1.ScheduleServices.updateIsAccepted(scheduleId, isAccepted);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule status (isAccepted) updated successfully",
        data: result,
    });
}));
const updateIsApproved = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleId = req.params.scheduleId;
    const { isApproved } = req.body;
    const result = yield schedule_service_1.ScheduleServices.updateIsApproved(scheduleId, isApproved);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule approval (isApproved) updated successfully",
        data: result,
    });
}));
const getAgentSchedules = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agentId = req.params.agentId;
    const { result, meta } = yield schedule_service_1.ScheduleServices.getAgentSchedules(agentId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Agent schedules retrieved successfully",
        data: result,
        meta,
    });
}));
const getUserSchedules = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const { result, meta } = yield schedule_service_1.ScheduleServices.getAgentSchedules(userId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User schedules retrieved successfully",
        data: result,
        meta,
    });
}));
const deleteSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleId = req.params.scheduleId;
    const result = yield schedule_service_1.ScheduleServices.deleteSchedule(scheduleId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule deleted successfully",
        data: result,
    });
}));
exports.ScheduleControllers = {
    createSchedule,
    getAllSchedules,
    getSingleSchedule,
    updateSchedule,
    deleteSchedule,
    updateIsAccepted,
    updateIsApproved,
    getAgentSchedules,
    getUserSchedules
};
