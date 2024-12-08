import { Router } from "express";
import { PopularPlacesController } from "./popularPlaces.controller";
import validateRequest from "../../middlewares/validateRequest";
import { PopularPlaceValidation } from "./popularPlaces.validation";

const router = Router();

router.post("/",validateRequest(PopularPlaceValidation.createPopularPlaceSchema), PopularPlacesController.createPopularPlaceController);
router.get("/", PopularPlacesController.getAllPopularPlacesController);
router.get("/:id", PopularPlacesController.getPopularPlaceByIdController);
router.put("/:id",validateRequest(PopularPlaceValidation.UpdatedPopularPlaceSchema), PopularPlacesController.updatePopularPlaceController);
router.delete("/:id", PopularPlacesController.deletePopularPlaceController);

export const popularPlacesRoutes = router;