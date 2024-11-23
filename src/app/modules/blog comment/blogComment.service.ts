/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
// import { Blog } from "../tourBlog/blog.model";
import { TBlogComment } from "./blogComment.interface";
import { BlogComment } from "./blogComment.model";
import { User } from "../User/user.model";
import mongoose from "mongoose";

import QueryBuilder from "../../builder/QueryBuilder";
import { Blog } from "../Blog/blog.model";

const createComment = async (payload: Partial<TBlogComment>) => {
  const { blogId, userId } = payload;

  const blogData = await Blog.findById(blogId);
  const userData = await User.findById(userId);

  if (!blogData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid blog Id");
  }
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid userId");
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [newComment] = await BlogComment.create([{ ...payload }], {
      session,
    });

    await Blog.findByIdAndUpdate(
      blogId,
      { $push: { blogComment: newComment._id } },
      { new: true, session },
    );

    await session.commitTransaction();
    session.endSession();

    return newComment;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create blogComment",
    );
  }
};

const getCommentForBlog = async (
  blogId: string,
  query: Record<string, unknown>,
) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new AppError(404, "Invalid blog Id");
  }
  const blogComment = new QueryBuilder(
    BlogComment.find({ blogId }).populate([
      { path: "userId", select: "firstName secondName lastName image" },
    ]),
    query,
  )
    .search(["blogComment"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await blogComment.modelQuery;
  const meta = await blogComment.countTotal();
  return { meta, result };
};

const updateComment = async (
  commentId: string,
  updatedData: Partial<TBlogComment>,
) => {
  const comment = await BlogComment.findById(commentId);

  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
  }

  Object.assign(comment, updatedData); // Update the comment with new data
  await comment.save(); // Save the updated comment

  return comment;
};

const deleteComment = async (commentId: string) => {
  const comment = await BlogComment.findById(commentId);

  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Remove the comment
    await BlogComment.findByIdAndDelete(commentId, { session });

    // Remove the comment reference from the blog
    await Blog.findByIdAndUpdate(
      comment.blogId,
      { $pull: { blogComment: commentId } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to delete the comment",
    );
  }
};

export const CommentServices = {
  createComment,
  getCommentForBlog,
  updateComment,
  deleteComment,
};
