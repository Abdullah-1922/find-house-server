"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.popularPlacesRoutes = void 0;
const express_1 = require("express");
const popularPlaces_controller_1 = require("./popularPlaces.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const popularPlaces_validation_1 = require("./popularPlaces.validation");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(popularPlaces_validation_1.PopularPlaceValidation.createPopularPlaceSchema), popularPlaces_controller_1.PopularPlacesController.createPopularPlaceController);
router.get("/", popularPlaces_controller_1.PopularPlacesController.getAllPopularPlacesController);
router.get("/:id", popularPlaces_controller_1.PopularPlacesController.getPopularPlaceByIdController);
router.put("/:id", (0, validateRequest_1.default)(popularPlaces_validation_1.PopularPlaceValidation.UpdatedPopularPlaceSchema), popularPlaces_controller_1.PopularPlacesController.updatePopularPlaceController);
router.delete("/:id", popularPlaces_controller_1.PopularPlacesController.deletePopularPlaceController);
exports.popularPlacesRoutes = router;
