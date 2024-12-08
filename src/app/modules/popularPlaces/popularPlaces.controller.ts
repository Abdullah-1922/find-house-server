import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { popularPlacesService } from "./popularPlaces.service";

const createPopularPlaceController = catchAsync(
  async (req: Request, res: Response) => {
    const newPlace = await popularPlacesService.createPopularPlace(req.body);
    sendResponse(res, {
      data: newPlace,
      message: "Popular place created successfully",
      statusCode: 201,
      success: true,
    });
  },
);

const getAllPopularPlacesController = catchAsync(
  async (req: Request, res: Response) => {
    const { result, total } = await popularPlacesService.getAllPopularPlaces(
      req.query,
    );
    sendResponse(res, {
      data: result,
      meta: total,
      message: "Popular places fetched successfully",
      statusCode: 200,
      success: true,
    });
  },
);

const getPopularPlaceByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const place = await popularPlacesService.getPopularPlaceById(req.params.id);
    if (!place) {
      sendResponse(res, {
        message: "Popular place not found",
        statusCode: 404,
        success: false,
      });
      return;
    }
    sendResponse(res, {
      data: place,
      message: "Popular place fetched successfully",
      statusCode: 200,
      success: true,
    });
  },
);

const updatePopularPlaceController = catchAsync(
  async (req: Request, res: Response) => {
    const updatedPlace = await popularPlacesService.updatePopularPlace(
      req.params.id,
      req.body,
    );
    if (!updatedPlace) {
      sendResponse(res, {
        message: "Popular place not found",
        statusCode: 404,
        success: false,
      });
      return;
    }
    sendResponse(res, {
      data: updatedPlace,
      message: "Popular place updated successfully",
      statusCode: 200,
      success: true,
    });
  },
);

const deletePopularPlaceController = catchAsync(
  async (req: Request, res: Response) => {
    const deleted = await popularPlacesService.deletePopularPlace(
      req.params.id,
    );
    if (!deleted) {
      sendResponse(res, {
        message: "Popular place not found",
        statusCode: 404,
        success: false,
      });
      return;
    }
    sendResponse(res, {
      message: "Popular place deleted successfully",
      statusCode: 204,
      success: true,
    });
  },
);

export const PopularPlacesController = {
  createPopularPlaceController,
  getAllPopularPlacesController,
  getPopularPlaceByIdController,
  updatePopularPlaceController,
  deletePopularPlaceController,
};
