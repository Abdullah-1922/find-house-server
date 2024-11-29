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
exports.ScheduleServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const property_model_1 = __importDefault(require("../property/property.model"));
const user_model_1 = require("../User/user.model");
const schedule_model_1 = require("./schedule.model");
const createSchedule = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.agent === payload.user) {
        throw new AppError_1.default(400, "You can't schedule a property with yourself");
    }
    const property = yield property_model_1.default.findById(payload.property);
    if (!property) {
        throw new AppError_1.default(400, "Property not found");
    }
    const currentDateTime = new Date();
    if (currentDateTime > payload.date) {
        throw new AppError_1.default(400, "You can't schedule a property in the past");
    }
    const user = yield user_model_1.User.findById(payload.user);
    if (!user) {
        throw new AppError_1.default(400, "User not found");
    }
    const agent = yield user_model_1.User.findById(payload.agent);
    if (!agent) {
        throw new AppError_1.default(400, "Agent not found");
    }
    const res = yield schedule_model_1.Schedule.create(payload);
    return res;
});
const getAllSchedules = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleQuery = new QueryBuilder_1.default(schedule_model_1.Schedule.find().populate(["user", "agent", "property"]), query)
        .search(["isApproved", "isAccepted"])
        .sort()
        .fields()
        .filter()
        .paginate();
    const result = yield scheduleQuery.modelQuery;
    const meta = yield scheduleQuery.countTotal();
    return { result, meta };
});
const getSingleSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield schedule_model_1.Schedule.findById(id).populate([
        "user",
        "agent",
        "property",
    ]);
    if (!schedule) {
        throw new AppError_1.default(404, "Schedule not found");
    }
    return schedule;
});
const updateSchedule = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield schedule_model_1.Schedule.findById(id);
    if (!schedule) {
        throw new AppError_1.default(404, "Invalid Schedule ID");
    }
    const updatedSchedule = yield schedule_model_1.Schedule.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedSchedule;
});
const updateIsAccepted = (id, isAccepted) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield schedule_model_1.Schedule.findById(id);
    if (!schedule) {
        throw new AppError_1.default(404, "Schedule not found");
    }
    if (!schedule.isApproved) {
        throw new AppError_1.default(400, "Schedule must be approved by admin before it can be accepted");
    }
    schedule.isAccepted = isAccepted;
    yield schedule.save();
    return schedule;
});
const updateIsApproved = (id, isApproved) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof isApproved !== "boolean") {
        throw new AppError_1.default(400, "Invalid value for isApproved, must be boolean.");
    }
    const schedule = yield schedule_model_1.Schedule.findByIdAndUpdate(id, { isApproved: isApproved }, { new: true });
    if (!schedule) {
        throw new AppError_1.default(404, "Schedule not found");
    }
    return schedule;
});
const deleteSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield schedule_model_1.Schedule.findByIdAndDelete(id);
    if (!schedule) {
        throw new AppError_1.default(404, "Invalid Schedule ID");
    }
    return schedule;
});
const getAgentSchedules = (agentId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleQuery = new QueryBuilder_1.default(schedule_model_1.Schedule.find({ agent: agentId }).populate(["user", "agent", "property"]), query)
        .search(["isApproved", "isAccepted"])
        .sort()
        .fields()
        .filter()
        .paginate();
    const result = yield scheduleQuery.modelQuery;
    const meta = yield scheduleQuery.countTotal();
    return { result, meta };
});
const getUserSchedules = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleQuery = new QueryBuilder_1.default(schedule_model_1.Schedule.find({ user: userId }).populate(["user", "agent", "property"]), query)
        .search(["isApproved", "isAccepted"])
        .sort()
        .fields()
        .filter()
        .paginate();
    const result = yield scheduleQuery.modelQuery;
    const meta = yield scheduleQuery.countTotal();
    return { result, meta };
});
exports.ScheduleServices = {
    createSchedule,
    getAllSchedules,
    getSingleSchedule,
    updateSchedule,
    deleteSchedule,
    updateIsAccepted,
    updateIsApproved,
    getAgentSchedules,
    getUserSchedules,
};
