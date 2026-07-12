import { Router } from "express";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createDepartmentValidator,
  updateDepartmentValidator,
} from "../validators/departmentValidator.js";
import handleValidation from "../utils/validationHandler.js";

const router = Router();

router.post(
  "/",
  protect,
  authorize("Admin"),
  createDepartmentValidator,
  handleValidation,
  createDepartment
);

router.get(
  "/",
  protect,
  getDepartments
);

router.get(
  "/:id",
  protect,
  getDepartmentById
);

router.put(
  "/:id",
  protect,
  authorize("Admin"),
  updateDepartmentValidator,
  handleValidation,
  updateDepartment
);

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteDepartment
);

export default router;
