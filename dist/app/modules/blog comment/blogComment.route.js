"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCommentRoutes = void 0;
const express_1 = require("express");
const blogComment_controller_1 = require("./blogComment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blogComment_validation_1 = require("./blogComment.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_utils_1 = require("../User/user.utils");
const route = (0, express_1.Router)();
route.post("/", (0, validateRequest_1.default)(blogComment_validation_1.BlogCommentValidation.createBlogCommentValidation), blogComment_controller_1.BlogCommentControllers.createBlogComment);
route.get("/:id", blogComment_controller_1.BlogCommentControllers.getCommentForBlog);
route.patch("/:id", (0, auth_1.default)(user_utils_1.USER_ROLE === null || user_utils_1.USER_ROLE === void 0 ? void 0 : user_utils_1.USER_ROLE.user, user_utils_1.USER_ROLE === null || user_utils_1.USER_ROLE === void 0 ? void 0 : user_utils_1.USER_ROLE.admin), (0, validateRequest_1.default)(blogComment_validation_1.BlogCommentValidation.updateBlogCommentValidation), blogComment_controller_1.BlogCommentControllers.updateBlogComment);
route.delete("/:id", (0, auth_1.default)(user_utils_1.USER_ROLE === null || user_utils_1.USER_ROLE === void 0 ? void 0 : user_utils_1.USER_ROLE.user, user_utils_1.USER_ROLE === null || user_utils_1.USER_ROLE === void 0 ? void 0 : user_utils_1.USER_ROLE.admin), blogComment_controller_1.BlogCommentControllers.deleteBlogComment);
exports.BlogCommentRoutes = route;
