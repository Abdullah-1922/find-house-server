import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductReviewValidation } from "./productReview.validation";
import { ProductReviewControllers } from "./productReview.controller";

const router = Router();

router.post(
  "/",
  validateRequest(ProductReviewValidation.CreateReviewValidationSchema),
  ProductReviewControllers.createReview,
);

router.get("/:productId", ProductReviewControllers.getAllReviewsByProduct);

router.patch(
  "/:reviewId",
  validateRequest(ProductReviewValidation.UpdateReviewValidationSchema),
  ProductReviewControllers.updateReview,
);

router.delete("/:reviewId", ProductReviewControllers.deleteReview);

export const ProductReviewRoutes = router;
