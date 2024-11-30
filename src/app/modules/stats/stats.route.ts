import express from "express";
import { StatsController } from "./stats.controller";
const router = express.Router();

router.get("/admin-stats", StatsController.getAdminStats);
router.get("/user-stats/:userId", StatsController.getUserStats);
router.get("/agent-stats/:userId", StatsController.getAgentStats);

export const StatsRoutes = router;
