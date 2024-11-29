import express from "express";
// import auth from "../../middlewares/auth";
// import { USER_ROLE } from "../user/user.utils";

import validateRequest from "../../middlewares/validateRequest";

import { PropertyControllers } from "./property.controller";
import { PropertyValidations } from "./property.validation";
import { USER_ROLE } from "../User/user.utils";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  //   auth(USER_ROLE.admin), // Only admins can create properties
  validateRequest(PropertyValidations.createPropertyValidationSchema),
  PropertyControllers.createProperty,
);

router.get(
  "/",
  // auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.agent), // Accessible by admin, user, and agent
  PropertyControllers.getAllProperties,
);

router.get(
  "/my-properties/:userId",
  // auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.agent), // Accessible by admin, user, and agent
  PropertyControllers.getMyAllProperties,
);

router.get(
  "/:id",
  //   auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.agent), // Accessible by admin, user, and agent
  PropertyControllers.getSingleProperty,
);

router.patch(
  "/add-favorite",
  //   auth(USER_ROLE.user), // Only user can update properties
  PropertyControllers.addPropertyFavorite,
);
router.patch(
  "/remove-favorite",
  //   auth(USER_ROLE.user), // Only user can update properties
  PropertyControllers.removePropertyFavorite,
);
router.patch(
  "/:id",
  //   auth(USER_ROLE.admin), // Only admins can update properties
  validateRequest(PropertyValidations.updatePropertyValidationSchema),
  PropertyControllers.updateProperty,
);

router.delete(
  "/:id",
  //   auth(USER_ROLE.admin), // Only admins can delete properties
  PropertyControllers.deleteProperty,
);

router.get(
  "/my-favorite-properties/:userId",
  PropertyControllers.getMyFavoriteProperties,
);

export const PropertyRoutes = router;
