import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { updateSettingsValidator } from "../validators/settingsValidator.js";
import handleValidation from "../utils/validationHandler.js";

const router = Router();

router.get(
  "/",
  protect,
  getSettings
);

router.put(
  "/",
  protect,
  authorize("Admin"),
  updateSettingsValidator,
  handleValidation,
  updateSettings
);

export default router;
