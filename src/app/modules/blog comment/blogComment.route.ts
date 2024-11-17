import { Router } from "express";
import { BlogCommentControllers } from "./blogComment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BlogCommentValidation } from "./blogComment.validation";

const route = Router();

route.post(
  "/",
  validateRequest(BlogCommentValidation.createBlogCommentValidation),
  BlogCommentControllers.createBlogComment,
);

route.get("/:id", BlogCommentControllers.getCommentForBlog);

export const BlogCommentRoutes = route;
             