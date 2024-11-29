"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = require("express");
const comment_controller_1 = require("./comment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const comment_validation_1 = require("./comment.validation");
const route = (0, express_1.Router)();
route.post("/", (0, validateRequest_1.default)(comment_validation_1.CommentValidation.createCommentValidation), comment_controller_1.CommentControllers.createComment);
route.get("/:id", comment_controller_1.CommentControllers.getCommentForProperty);
exports.CommentRoutes = route;
