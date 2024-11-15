import express from "express";
// import auth from "../../middlewares/auth";
// import { USER_ROLE } from "../user/user.utils";

import validateRequest from "../../middlewares/validateRequest";

import { PropertyControllers } from "./property.controller";
import { PropertyValidations } from "./property.validation";

const router = express.Router();

router.post(
  "/",
  //   auth(USER_ROLE.admin), // Only admins can create properties
  validateRequest(PropertyValidations.createPropertyValidationSchema),
  PropertyControllers.createProperty,
);

router.get(
  "/",
  //   auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.driver), // Accessible by admin, user, and driver
  PropertyControllers.getAllProperties,
);

router.get(
  "/:id",
  //   auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.driver), // Accessible by admin, user, and driver
  PropertyControllers.getSingleProperty,
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

export const PropertyRoutes = router;
