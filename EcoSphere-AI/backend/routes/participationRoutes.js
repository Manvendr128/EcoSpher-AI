import { Router } from "express";
import {
  joinActivity,
  submitProof,
  getMyParticipations,
  getAllParticipations,
} from "../controllers/participationController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  joinActivityValidator,
  submitProofValidator,
} from "../validators/participationValidator.js";
import handleValidation from "../utils/validationHandler.js";

const router = Router();

router.post(
  "/join",
  protect,
  joinActivityValidator,
  handleValidation,
  joinActivity
);

router.post(
  "/submit-proof",
  protect,
  submitProofValidator,
  handleValidation,
  submitProof
);

router.get(
  "/my",
  protect,
  getMyParticipations
);

router.get(
  "/",
  protect,
  authorize("Admin"),
  getAllParticipations
);

export default router;
