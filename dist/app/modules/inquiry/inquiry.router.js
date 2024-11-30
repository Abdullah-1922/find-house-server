"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryRoutes = void 0;
// inquiry.routes.ts
const express_1 = __importDefault(require("express"));
const inquiry_controller_1 = require("./inquiry.controller");
const router = express_1.default.Router();
router.post("/", inquiry_controller_1.InquiryControllers.createInquiry);
router.get("/", inquiry_controller_1.InquiryControllers.getAllInquiries);
router.get("/user/:userId", inquiry_controller_1.InquiryControllers.inquiryByUser);
router.get("/agent/:agentId", inquiry_controller_1.InquiryControllers.inquiryByAgent);
router.get("/:inquiryId", inquiry_controller_1.InquiryControllers.getSingleInquiry);
router.patch("/:inquiryId", inquiry_controller_1.InquiryControllers.updateInquiry);
router.delete("/:inquiryId", inquiry_controller_1.InquiryControllers.deleteInquiry);
exports.InquiryRoutes = router;
