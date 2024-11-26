/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlog = async (payload: Partial<TBlog>) => {
  const user = await User.findById(payload.userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const res = await Blog.create(payload);
  return res;
};

const getAllBlog = async (query: Record<string, any>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate("userId"), query)
    .search(["category", "title", "description"])
    .sort()
    .fields()
    .filter()
    .paginate();

  const result = await blogQuery.modelQuery;
  const meta = await blogQuery.countTotal();
  return { result, meta };
};

const getAllSearchBlog = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().select(["title", "image", "createdAt"]),
    query,
  )
    .search(["category", "title", "description"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await blogQuery.modelQuery;
  const meta = await blogQuery.countTotal();
  return { result, meta };
};

const deleteSingleBlog = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);

  return result;
};
const getSingleBlog = async (id: string) => {
  const result = await Blog.findById(id).populate([
    { path: "userId", select: "firstName secondName image" },
  ]);

  return result;
};
const updateBlog = async (id: string, payload: Partial<TBlog>) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(404, "Blog id Invalid");
  }
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

export const BlogServices = {
  createBlog,
  getAllBlog,
  deleteSingleBlog,
  getSingleBlog,
  updateBlog,
  getAllSearchBlog,
};
