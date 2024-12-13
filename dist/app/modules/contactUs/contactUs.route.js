"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsRoutes = void 0;
const express_1 = require("express");
const contactUs_controller_1 = require("./contactUs.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const contactUs_validation_1 = require("./contactUs.validation");
const route = (0, express_1.Router)();
route.get('/', contactUs_controller_1.ContactUsController.getAllContactUs);
route.post('/', (0, validateRequest_1.default)(contactUs_validation_1.ContactUsValidationSchema), contactUs_controller_1.ContactUsController.createContactUs);
route.get('/:id', contactUs_controller_1.ContactUsController.getContactUsById);
route.put('/:id', contactUs_controller_1.ContactUsController.updateContactUsById);
route.delete('/:id', contactUs_controller_1.ContactUsController.deleteContactUsById);
exports.ContactUsRoutes = route;
