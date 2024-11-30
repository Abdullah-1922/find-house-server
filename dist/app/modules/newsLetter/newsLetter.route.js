"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsLetterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const newsLetter_controller_1 = require("./newsLetter.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const newsLetter_validation_1 = require("./newsLetter.validation");
const router = express_1.default.Router();
// Add a subscriber
router.post("/", (0, validateRequest_1.default)(newsLetter_validation_1.newsletterValidationSchema), newsLetter_controller_1.addSubscriber);
// Get all subscribers
router.get("/", newsLetter_controller_1.getSubscribers);
exports.NewsLetterRoutes = router;
