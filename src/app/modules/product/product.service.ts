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
  const productQuery = new QueryBuilder(
    Product.find().populate("admin").populate("review"),
    query,
  )
    .search(["name", "description", "category"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return { result, meta };
};

const getAllProductsForAdmin = async () => {
  const result = await Product.find().populate("admin").populate("review");
  return result;
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
  console.log(productId, userId);
  // Validate productId and userId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new AppError(400, "Invalid product ID format");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(400, "Invalid user ID format");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(404, "Product not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  // Add product to user's favorites if not already present
  if (!product.favoriteBy.includes(user._id)) {
    product.favoriteBy.push(user._id);
    await product.save();
  }

  if (!user.favoriteProducts.includes(product._id)) {
    user.favoriteProducts.push(product._id);
    await user.save();
  }

  return product;
};

const removeProductFavorite = async (productId: string, userId: string) => {
  // Validate IDs
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new AppError(400, "Invalid product ID format");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(400, "Invalid user ID format");
  }

  // Find product and user
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(404, "Product not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  // Remove product from user's favorites and user from product's favorites
  product.favoriteBy = product.favoriteBy.filter(
    (favoriteUserId) => !favoriteUserId.equals(user._id),
  );
  await product.save();

  user.favoriteProducts = user.favoriteProducts.filter(
    (favoriteProductId) => !favoriteProductId.equals(product._id),
  );
  await user.save();

  return product;
};

const getMyFavoriteProducts = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(400, "Invalid user ID format");
  }

  // Find user and populate favorite products
  const user = await User.findById(userId).populate("favoriteProducts");
  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user.favoriteProducts;
};

export const ProductServices = {
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
