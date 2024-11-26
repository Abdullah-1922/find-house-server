import express from "express";
import { ScheduleControllers } from "./schedule.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ScheduleValidation } from "./schedule.validation";

const router = express.Router();

router.post("/", ScheduleControllers.createSchedule);
router.get("/", ScheduleControllers.getAllSchedules);
router.get("/:scheduleId", ScheduleControllers.getSingleSchedule);
router.get("/user/:userId", ScheduleControllers.getUserSchedules);
router.get("/agent/:agentId", ScheduleControllers.getAgentSchedules);
router.patch(
  "/:scheduleId/is-accepted",
  validateRequest(ScheduleValidation.UpdateIsAcceptedValidationSchema),
  ScheduleControllers.updateIsAccepted,
);
router.patch(
  "/:scheduleId/is-approved",
  validateRequest(ScheduleValidation.UpdateIsApprovedValidationSchema),
  ScheduleControllers.updateIsApproved,
);
router.put("/:scheduleId", ScheduleControllers.updateSchedule);
router.delete("/:scheduleId", ScheduleControllers.deleteSchedule);

export const ScheduleRoutes = router;
