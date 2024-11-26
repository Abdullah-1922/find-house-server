import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";

import { User } from "../User/user.model";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: TProduct) => {
  const user = await User.findById(payload.admin);
  if (!user) {
    throw new AppError(404, "Admin user not found");
  }
  const product = await Product.create(payload);
  return product;
};

const getAllProducts = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find().populate("admin"), query)
    .search(["name", "description", "category"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return { result, meta };
};

const getProductById = async (id: string) => {
  const product = await Product.findById(id).populate("admin");
  if (!product) {
    throw new AppError(404, "Product not found");
  }
  return product;
};

const updateProduct = async (id: string, payload: TProduct) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(404, "Product not found");
  }
  const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedProduct;
};

const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new AppError(404, "Product not found");
  }
  return product;
};

const addProductFavorite = async (productId: string, userId: string) => {
  if (
    !mongoose.Types.ObjectId.isValid(productId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    throw new AppError(400, "Invalid product ID or user ID format");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(404, "product not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (!product.favoriteBy.includes(user._id)) {
    product.favoriteBy.push(user._id);
    await product.save();
  }

  if (!user.favoriteProperties.includes(product._id)) {
    user.favoriteProperties.push(product._id);
    await user.save();
  }

  return product;
};

const removeProductFavorite = async (productId: string, userId: string) => {
  if (
    !mongoose.Types.ObjectId.isValid(productId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    throw new AppError(400, "Invalid product ID or user ID format");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(404, "product not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  product.favoriteBy = product.favoriteBy.filter(
    (favoriteUserId) => !favoriteUserId.equals(user._id),
  );
  await product.save();

  user.favoriteProperties = user.favoriteProperties.filter(
    (favoriteProductId) => !favoriteProductId.equals(product._id),
  );
  await user.save();

  return product;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProductFavorite,
  removeProductFavorite,
};
