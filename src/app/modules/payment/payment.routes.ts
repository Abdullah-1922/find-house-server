import { Router } from "express";
import Auth from "../../middlewares/auth";
import { PaymentController } from "./payment.controller";
import { USER_ROLE } from "../User/user.utils";
const router = Router();

router.post("/subscriptions/:userId", PaymentController.subscriptions);

router.post("/conformation/:userId", PaymentController.paymentConformation);

router.get("/", Auth(USER_ROLE.admin), PaymentController.getPaymentsData);

router.get(
  "/analytics",
  Auth(USER_ROLE.admin),
  PaymentController.getPaymentsData,
);

export const PaymentRoutes = router;