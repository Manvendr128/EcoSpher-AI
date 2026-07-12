import { Router } from "express";

import { register, login, getProfile } from "../controllers/authController.js";
import { protect, authorize }          from "../middleware/authMiddleware.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";
import handleValidation                from "../utils/validationHandler.js";

const router = Router();

router.post(
  "/register",
  registerValidator,
  handleValidation,
  register
);

router.post(
  "/login",
  loginValidator,
  handleValidation,
  login
);

router.get(
  "/profile",
  protect,
  getProfile
);

router.get(
  "/admin",
  protect,
  authorize("Admin"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

export default router;
