import { Router } from "express";

import { BlogControllers } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidation } from "./blog.validation";

const router = Router();

router.post(
  "/",
  validateRequest(BlogValidation.CreateBlogValidationSchema),
  BlogControllers.createBlog,
);
router.get("/", BlogControllers.getAllBlog);
router.get("/search", BlogControllers.getAllSearchBlog);
router.delete("/:blogId", BlogControllers.deleteBlogWithId);
router.get("/:blogId", BlogControllers.getSingleBlog);
router.patch(
  "/:blogId",
  validateRequest(BlogValidation.UpdateBlogValidationSchema),
  BlogControllers.updateBlog,
);
export const BlogRoutes = router;
