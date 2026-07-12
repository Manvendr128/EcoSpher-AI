import { Router } from "express";
import {
  getAdminDashboard,
  getEmployeeDashboard,
} from "../controllers/dashboardController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/admin",
  protect,
  authorize("Admin", "DepartmentHead"),
  getAdminDashboard
);

router.get(
  "/employee",
  protect,
  getEmployeeDashboard
);

export default router;
