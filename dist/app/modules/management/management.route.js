"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementRoutes = void 0;
const express_1 = __importDefault(require("express"));
const management_controller_1 = require("./management.controller");
const router = express_1.default.Router();
router.post("/", management_controller_1.ManagementControllers.createManagement);
router.get("/", management_controller_1.ManagementControllers.getAllManagement);
router.get("/:managementId", management_controller_1.ManagementControllers.getSingleManagement);
router.patch("/:managementId", management_controller_1.ManagementControllers.updateManagement);
router.delete("/:managementId", management_controller_1.ManagementControllers.deleteManagementWithId);
exports.ManagementRoutes = router;
