import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.utils";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.findUserById);

router.get("/role-based-user/:role", UserController.getRoleBasedUser);

router.patch(
  "/update-role/:id/:role",
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE?.agent),
  UserController.updateRole,
);

router.put(
  "/:id",
  validateRequest(UserValidations.updateUserValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE?.agent),

  UserController.updateUserById,
);

router.delete("/:id", auth(USER_ROLE.admin), UserController.deleteUserById);

export const UserRoutes = router;
