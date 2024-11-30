import { Router } from "express";
import Auth from "../../middlewares/auth";
import { PaymentController } from "./payment.controller";
import { USER_ROLE } from "../User/user.utils";
import validateRequest from "../../middlewares/validateRequest";
import { PaymentSchema } from "./payment.validation";
const router = Router();

router.post(
  "/online",
  validateRequest(PaymentSchema),
  PaymentController.createPayment,
);

router.post(
  "/cash-on-delivery",
  validateRequest(PaymentSchema),
  PaymentController.cashOnDeliveryPayment,
);

router.post(
  "/cash-on-delivery/:userId",
  PaymentController.CasOnDeliveryStatusUpdate,
);

router.post("/confirmation/:userId", PaymentController.paymentConformation);

router.get(
  "/:userId",
  Auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.agent),
  PaymentController.getMyPaymentsData,
);

router.get(
  "/product-payments/:gatewayName",
  PaymentController.getAllPaymentsData,
);

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.agent),
  PaymentController.getAllPayments,
);
router.patch(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.agent),
  PaymentController.updatePaymentStatus,
);

router.get(
  "/analytics",
  Auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.agent),
  PaymentController.getMyPaymentsData,
);
export const PaymentRoutes = router;
