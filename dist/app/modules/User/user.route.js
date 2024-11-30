"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_utils_1 = require("./user.utils");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get("/", user_controller_1.UserController.getAllUsers);
router.get("/:id", user_controller_1.UserController.findUserById);
router.get("/role-based-user/:role", user_controller_1.UserController.getRoleBasedUser);
router.patch("/update-role/:id/:role", (0, auth_1.default)(user_utils_1.USER_ROLE.admin, user_utils_1.USER_ROLE.user, user_utils_1.USER_ROLE === null || user_utils_1.USER_ROLE === void 0 ? void 0 : user_utils_1.USER_ROLE.agent), user_controller_1.UserController.updateRole);
router.put("/:id", (0, validateRequest_1.default)(user_validation_1.UserValidations.updateUserValidationSchema), (0, auth_1.default)(user_utils_1.USER_ROLE.admin, user_utils_1.USER_ROLE.user, user_utils_1.USER_ROLE === null || user_utils_1.USER_ROLE === void 0 ? void 0 : user_utils_1.USER_ROLE.agent), user_controller_1.UserController.updateUserById);
router.delete("/:id", (0, auth_1.default)(user_utils_1.USER_ROLE.admin), user_controller_1.UserController.deleteUserById);
exports.UserRoutes = router;