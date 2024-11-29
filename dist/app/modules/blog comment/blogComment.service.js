"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blogComment_model_1 = require("./blogComment.model");
const user_model_1 = require("../User/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blog_model_1 = require("../Blog/blog.model");
const createComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId, userId } = payload;
    const blogData = yield blog_model_1.Blog.findById(blogId);
    const userData = yield user_model_1.User.findById(userId);
    if (!blogData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid blog Id");
    }
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid userId");
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const [newComment] = yield blogComment_model_1.BlogComment.create([Object.assign({}, payload)], {
            session,
        });
        yield blog_model_1.Blog.findByIdAndUpdate(blogId, { $push: { blogComment: newComment._id } }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return newComment;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to create blogComment");
    }
});
const getCommentForBlog = (blogId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(blogId);
    if (!blog) {
        throw new AppError_1.default(404, "Invalid blog Id");
    }
    const blogComment = new QueryBuilder_1.default(blogComment_model_1.BlogComment.find({ blogId }).populate([
        { path: "userId", select: "firstName secondName lastName image" },
    ]), query)
        .search(["blogComment"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield blogComment.modelQuery;
    const meta = yield blogComment.countTotal();
    return { meta, result };
});
const updateComment = (commentId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield blogComment_model_1.BlogComment.findById(commentId);
    if (!comment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
    }
    Object.assign(comment, updatedData); // Update the comment with new data
    yield comment.save(); // Save the updated comment
    return comment;
});
const deleteComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield blogComment_model_1.BlogComment.findById(commentId);
    if (!comment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Remove the comment
        yield blogComment_model_1.BlogComment.findByIdAndDelete(commentId, { session });
        // Remove the comment reference from the blog
        yield blog_model_1.Blog.findByIdAndUpdate(comment.blogId, { $pull: { blogComment: commentId } }, { session });
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to delete the comment");
    }
});
exports.CommentServices = {
    createComment,
    getCommentForBlog,
    updateComment,
    deleteComment,
};
