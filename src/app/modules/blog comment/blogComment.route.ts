import { Router } from "express";
import { BlogCommentControllers } from "./blogComment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BlogCommentValidation } from "./blogComment.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.utils";

const route = Router();

route.post(
  "/",
  validateRequest(BlogCommentValidation.createBlogCommentValidation),
  BlogCommentControllers.createBlogComment,
);

route.get("/:id", BlogCommentControllers.getCommentForBlog);
route.patch(
  "/:id",
  auth(USER_ROLE?.user, USER_ROLE?.admin),
  validateRequest(BlogCommentValidation.updateBlogCommentValidation),
  BlogCommentControllers.updateBlogComment,
);

route.delete(
  "/:id",
  auth(USER_ROLE?.user, USER_ROLE?.admin),
  BlogCommentControllers.deleteBlogComment,
);

export const BlogCommentRoutes = route;
