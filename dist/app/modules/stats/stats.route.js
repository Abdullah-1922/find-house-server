"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const stats_controller_1 = require("./stats.controller");
const router = express_1.default.Router();
router.get("/admin-stats", stats_controller_1.StatsController.getAdminStats);
router.get("/user-stats/:userId", stats_controller_1.StatsController.getUserStats);
router.get("/agent-stats/:userId", stats_controller_1.StatsController.getAgentStats);
router.get("/filter-stats", stats_controller_1.StatsController.filterStats);
exports.StatsRoutes = router;
