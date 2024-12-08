import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { getAllSubscribers, subscribeToNewsletter } from "./newsLetter.service";

export const addSubscriber = catchAsync(async (req: Request, res: Response) => {
  const subscriberData = req.body;
  const subscriber = await subscribeToNewsletter(subscriberData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Subscribed successfully",
    data: subscriber,
  });
});

export const getSubscribers = catchAsync(
  async (req: Request, res: Response) => {
    const { subscribers, meta } = await getAllSubscribers(req.query);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Subscribers retrieved successfully",
      data: subscribers,
      meta: meta,
    });
  },
);
