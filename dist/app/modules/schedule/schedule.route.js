"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const schedule_controller_1 = require("./schedule.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const schedule_validation_1 = require("./schedule.validation");
const router = express_1.default.Router();
router.post("/", schedule_controller_1.ScheduleControllers.createSchedule);
router.get("/", schedule_controller_1.ScheduleControllers.getAllSchedules);
router.get("/:scheduleId", schedule_controller_1.ScheduleControllers.getSingleSchedule);
router.get("/user/:userId", schedule_controller_1.ScheduleControllers.getUserSchedules);
router.get("/agent/:agentId", schedule_controller_1.ScheduleControllers.getAgentSchedules);
router.patch("/:scheduleId/is-accepted", (0, validateRequest_1.default)(schedule_validation_1.ScheduleValidation.UpdateIsAcceptedValidationSchema), schedule_controller_1.ScheduleControllers.updateIsAccepted);
router.patch("/:scheduleId/is-approved", (0, validateRequest_1.default)(schedule_validation_1.ScheduleValidation.UpdateIsApprovedValidationSchema), schedule_controller_1.ScheduleControllers.updateIsApproved);
router.put("/:scheduleId", schedule_controller_1.ScheduleControllers.updateSchedule);
router.delete("/:scheduleId", schedule_controller_1.ScheduleControllers.deleteSchedule);
exports.ScheduleRoutes = router;
