import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { updateUserValidationSchema } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.utils";

const router = express.Router();

router.get(
  "/",
  // auth(USER_ROLE.admin),
  UserController.getAllUsers,
);

router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.findUserById,
);
router.patch("/make-agent/:id", UserController.makeAgent);

router.patch(
  "/:id",
  // auth(USER_ROLE.admin),
  validateRequest(updateUserValidationSchema),
  UserController.updateUserById,
);

router.delete(
  "/:id",
  // auth(USER_ROLE.admin),
  UserController.deleteUserById,
);

export const UserRoutes = router;
