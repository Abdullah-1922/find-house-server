import express from "express";
import { PropertyPaymentController } from "./propertyPayment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { PropertyPaymentValidation } from "./propertyPayment.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(
    PropertyPaymentValidation.createPropertyPaymentValidationSchema,
  ),
  PropertyPaymentController.createPayment,
);

router.get("/", PropertyPaymentController.getPayments);
router.get(
  "/agent/:userId",
  PropertyPaymentController.getPaymentsForAgent,
);
router.get("/:id", PropertyPaymentController.getPaymentById);
router.patch("/:id", PropertyPaymentController.updatePropertyPayment);

export const PropertyPaymentRoutes = router;
