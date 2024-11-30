// inquiry.routes.ts
import express from "express";
import { InquiryControllers } from "./inquiry.controller";

const router = express.Router();

router.post("/", InquiryControllers.createInquiry);
router.get("/", InquiryControllers.getAllInquiries);
router.get("/user/:userId", InquiryControllers.inquiryByUser);
router.get("/agent/:agentId", InquiryControllers.inquiryByAgent);
router.get("/:inquiryId", InquiryControllers.getSingleInquiry);
router.patch("/:inquiryId", InquiryControllers.updateInquiry);
router.delete("/:inquiryId", InquiryControllers.deleteInquiry);

export const InquiryRoutes = router;
