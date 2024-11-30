import express from "express";
import { addSubscriber, getSubscribers } from "./newsLetter.controller";
import validateRequest from "../../middlewares/validateRequest";
import { newsletterValidationSchema } from "./newsLetter.validation";

const router = express.Router();

// Add a subscriber
router.post("/", validateRequest(newsletterValidationSchema), addSubscriber);

// Get all subscribers
router.get("/", getSubscribers);

export const NewsLetterRoutes = router;
