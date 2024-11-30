"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import auth from "../../middlewares/auth";
// import { USER_ROLE } from "../user/user.utils";
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const property_controller_1 = require("./property.controller");
const property_validation_1 = require("./property.validation");
const router = express_1.default.Router();
router.post("/", 
//   auth(USER_ROLE.admin), // Only admins can create properties
(0, validateRequest_1.default)(property_validation_1.PropertyValidations.createPropertyValidationSchema), property_controller_1.PropertyControllers.createProperty);
router.get("/", 
// auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.agent), // Accessible by admin, user, and agent
property_controller_1.PropertyControllers.getAllProperties);
router.get("/my-property/:userId", 
//   auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.driver), // Accessible by admin, user, and driver
property_controller_1.PropertyControllers.getMyProperties);
router.get("/my-properties/:userId", 
// auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.agent), // Accessible by admin, user, and agent
property_controller_1.PropertyControllers.getMyAllProperties);
router.get("/:id", 
//   auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.agent), // Accessible by admin, user, and agent
property_controller_1.PropertyControllers.getSingleProperty);
router.patch("/add-favorite", 
//   auth(USER_ROLE.user), // Only user can update properties
property_controller_1.PropertyControllers.addPropertyFavorite);
router.patch("/remove-favorite", 
//   auth(USER_ROLE.user), // Only user can update properties
property_controller_1.PropertyControllers.removePropertyFavorite);
router.patch("/:id", 
//   auth(USER_ROLE.admin), // Only admins can update properties
(0, validateRequest_1.default)(property_validation_1.PropertyValidations.updatePropertyValidationSchema), property_controller_1.PropertyControllers.updateProperty);
router.delete("/:id", 
//   auth(USER_ROLE.admin), // Only admins can delete properties
property_controller_1.PropertyControllers.deleteProperty);
router.get("/my-favorite-properties/:userId", property_controller_1.PropertyControllers.getMyFavoriteProperties);
exports.PropertyRoutes = router;
