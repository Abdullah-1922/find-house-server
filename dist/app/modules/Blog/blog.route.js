"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(blog_validation_1.BlogValidation.CreateBlogValidationSchema), blog_controller_1.BlogControllers.createBlog);
router.get("/", blog_controller_1.BlogControllers.getAllBlog);
router.get("/search", blog_controller_1.BlogControllers.getAllSearchBlog);
router.delete("/:blogId", blog_controller_1.BlogControllers.deleteBlogWithId);
router.get("/:blogId", blog_controller_1.BlogControllers.getSingleBlog);
router.patch("/:blogId", (0, validateRequest_1.default)(blog_validation_1.BlogValidation.UpdateBlogValidationSchema), blog_controller_1.BlogControllers.updateBlog);
exports.BlogRoutes = router;
