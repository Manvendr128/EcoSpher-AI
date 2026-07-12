import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createCategoryValidator,
  updateCategoryValidator,
} from "../validators/categoryValidator.js";
import handleValidation from "../utils/validationHandler.js";

const router = Router();

router.post(
  "/",
  protect,
  authorize("Admin"),
  createCategoryValidator,
  handleValidation,
  createCategory
);

router.get(
  "/",
  protect,
  getCategories
);

router.get(
  "/:id",
  protect,
  getCategoryById
);

router.put(
  "/:id",
  protect,
  authorize("Admin"),
  updateCategoryValidator,
  handleValidation,
  updateCategory
);

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteCategory
);

export default router;
