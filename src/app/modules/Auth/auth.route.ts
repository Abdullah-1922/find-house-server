import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.utils";

const router = express.Router();

router.post(
  "/login/email",
  validateRequest(AuthValidation.loginEmailValidationSchema),
  AuthControllers.loginEmailUser,
);
router.post(
  "/login/facebook",
  validateRequest(AuthValidation.loginFacebookValidationSchema),
  AuthControllers.loginFacebookUser,
);
router.post(
  "/login/twitter",
  validateRequest(AuthValidation.loginTwitterValidationSchema),
  AuthControllers.loginTwitterUser,
);

router.post(
  "/signup/email",
  validateRequest(AuthValidation.registerEmailUserValidationSchema),
  AuthControllers.registerByEmail,
);

router.post(
  "/forgot-password",
  validateRequest(AuthValidation.forgotPasswordValidationSchema),
  AuthControllers.forgotPassword,
);

router.post(
  "/reset-password",
  auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user),
  AuthControllers.resetPassword,
);

router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
