import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";

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

// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// );
router.post(
  "/signup/email",
  validateRequest(AuthValidation.registerEmailUserValidationSchema),
  AuthControllers.registerByEmail,
);

export const AuthRoutes = router;
