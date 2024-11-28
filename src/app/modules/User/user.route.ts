import express from "express";
import { UserController } from "./user.controller";
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
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE?.agent),
  UserController.findUserById,
);

router.get(
  "/:role",
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE?.agent),
  UserController.getRoleBasedUser,
);

router.patch(
  "/update-role/:id/:role",
  auth(USER_ROLE.admin),
  UserController.updateRole,
);

router.put(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE?.agent),
  UserController.updateUserById,
);

router.delete("/:id", auth(USER_ROLE.admin), UserController.deleteUserById);

export const UserRoutes = router;
