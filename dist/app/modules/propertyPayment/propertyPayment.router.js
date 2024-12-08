"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyPaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const propertyPayment_controller_1 = require("./propertyPayment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const propertyPayment_validation_1 = require("./propertyPayment.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(propertyPayment_validation_1.PropertyPaymentValidation.createPropertyPaymentValidationSchema), propertyPayment_controller_1.PropertyPaymentController.createPayment);
router.get("/", propertyPayment_controller_1.PropertyPaymentController.getPayments);
router.get("/agent/:userId", propertyPayment_controller_1.PropertyPaymentController.getPaymentsForAgent);
router.get("/:id", propertyPayment_controller_1.PropertyPaymentController.getPaymentById);
router.patch("/:id", propertyPayment_controller_1.PropertyPaymentController.updatePropertyPayment);
exports.PropertyPaymentRoutes = router;
