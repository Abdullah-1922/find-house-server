import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatsServices } from "./stats.services";

const getAdminStats = catchAsync(async (req, res) => {
  const result = await StatsServices.getAdminStats();

  sendResponse(res, {
    data: result,
    message: "Stats fetched successfully (Admin)",
    statusCode: 200,
    success: true,
  });
});
const getUserStats = catchAsync(async (req, res) => {
  console.log(req.params.userId);
  const result = await StatsServices.getUserStats(req.params.userId);

  sendResponse(res, {
    data: result,
    message: "Stats fetched successfully (User)",
    statusCode: 200,
    success: true,
  });
});
const getAgentStats = catchAsync(async (req, res) => {
  const result = await StatsServices.getAgentStats(req.params.userId);

  sendResponse(res, {
    data: result,
    message: "Stats fetched successfully (Agent)",
    statusCode: 200,
    success: true,
  });
});


export const StatsController = {
  getAdminStats,
  getUserStats,
  getAgentStats
};
