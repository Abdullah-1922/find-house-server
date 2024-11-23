import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentServices } from "./blogComment.service";

const createBlogComment = catchAsync(async (req, res) => {
  const result = await CommentServices.createComment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment created successfully",
    data: result,
  });
});
const getCommentForBlog = catchAsync(async (req, res) => {
  const { result, meta } = await CommentServices.getCommentForBlog(
    req.params.id,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment retrieved successfully",
    meta: meta,
    data: result,
  });
});

const updateBlogComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await CommentServices.updateComment(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment updated successfully",
    data: result,
  });
});

const deleteBlogComment = catchAsync(async (req, res) => {
  const { id } = req.params;

  await CommentServices.deleteComment(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment deleted successfully",
  });
});

export const BlogCommentControllers = {
  createBlogComment,
  getCommentForBlog,
  updateBlogComment,
  deleteBlogComment,
};
