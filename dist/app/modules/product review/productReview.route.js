"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const productReview_validation_1 = require("./productReview.validation");
const productReview_controller_1 = require("./productReview.controller");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(productReview_validation_1.ProductReviewValidation.CreateReviewValidationSchema), productReview_controller_1.ProductReviewControllers.createReview);
router.get("/:productId", productReview_controller_1.ProductReviewControllers.getAllReviewsByProduct);
router.patch("/:reviewId", (0, validateRequest_1.default)(productReview_validation_1.ProductReviewValidation.UpdateReviewValidationSchema), productReview_controller_1.ProductReviewControllers.updateReview);
router.delete("/:reviewId", productReview_controller_1.ProductReviewControllers.deleteReview);
router.get("/", productReview_controller_1.ProductReviewControllers.getAllReviews);
router.get("/user-review/:userId", productReview_controller_1.ProductReviewControllers.getAllReviewsByUser);
exports.ProductReviewRoutes = router;
