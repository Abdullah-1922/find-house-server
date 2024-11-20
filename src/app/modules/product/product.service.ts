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

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
