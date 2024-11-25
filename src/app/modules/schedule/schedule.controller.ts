import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ScheduleServices } from "./schedule.service";
import sendResponse from "../../utils/sendResponse";

const createSchedule = catchAsync(async (req, res) => {
  const result = await ScheduleServices.createSchedule(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
});

const getAllSchedules = catchAsync(async (req, res) => {
  const { result, meta } = await ScheduleServices.getAllSchedules(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedules retrieved successfully",
    data: result,
    meta,
  });
});

const getSingleSchedule = catchAsync(async (req, res) => {
  const scheduleId = req.params.scheduleId;
  const result = await ScheduleServices.getSingleSchedule(scheduleId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule retrieved successfully",
    data: result,
  });
});

const updateSchedule = catchAsync(async (req, res) => {
  const scheduleId = req.params.scheduleId;
  const result = await ScheduleServices.updateSchedule(scheduleId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule updated successfully",
    data: result,
  });
});


const updateIsAccepted = catchAsync(async (req, res) => {
    const scheduleId = req.params.scheduleId;
    const { isAccepted } = req.body;
  
    const result = await ScheduleServices.updateIsAccepted(scheduleId, isAccepted);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedule status (isAccepted) updated successfully",
      data: result,
    });
  });
  
  const updateIsApproved = catchAsync(async (req, res) => {
    const scheduleId = req.params.scheduleId;
    const { isApproved } = req.body;
  
    const result = await ScheduleServices.updateIsApproved(scheduleId, isApproved);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedule approval (isApproved) updated successfully",
      data: result,
    });
  });
  





const deleteSchedule = catchAsync(async (req, res) => {
  const scheduleId = req.params.scheduleId;
  const result = await ScheduleServices.deleteSchedule(scheduleId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});

export const ScheduleControllers = {
  createSchedule,
  getAllSchedules,
  getSingleSchedule,
  updateSchedule,
  deleteSchedule,
  updateIsAccepted,
  updateIsApproved,
};
