import express from "express";
import { ManagementControllers } from "./management.controller";

const router = express.Router();

router.post("/", ManagementControllers.createManagement);
router.get("/", ManagementControllers.getAllManagement);
router.get("/:managementId", ManagementControllers.getSingleManagement);
router.patch("/:managementId", ManagementControllers.updateManagement);
router.delete("/:managementId", ManagementControllers.deleteManagementWithId);

export const ManagementRoutes = router;