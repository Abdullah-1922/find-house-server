import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";
import AppError from "../../errors/AppError";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProduct(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const { result, meta } = await ProductServices.getAllProducts(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
    meta,
  });
});

const getAllProductsForAdmin = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsForAdmin();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const result = await ProductServices.getProductById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.updateProduct(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.deleteProduct(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

const addProductFavorite = catchAsync(async (req, res) => {
  const { productId, userId } = req.body;
  const result = await ProductServices.addProductFavorite(productId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product added to favorites successfully",
    // data: result,
  });
});

const removeProductFavorite = catchAsync(async (req, res) => {
  const { productId, userId } = req.body;

  const result = await ProductServices.removeProductFavorite(productId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product removed from favorites successfully",
    data: result,
  });
});

const getMyFavoriteProducts = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await ProductServices.getMyFavoriteProducts(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Favorites products retrieved successfully",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getAllProductsForAdmin,
  getProductById,
  updateProduct,
  deleteProduct,
  addProductFavorite,
  removeProductFavorite,
  getMyFavoriteProducts,
};
