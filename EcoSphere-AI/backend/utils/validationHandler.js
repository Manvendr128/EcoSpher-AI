import { validationResult } from "express-validator";

/**
 * Validation Handler Middleware
 *
 * Reads the result of express-validator chains attached to a route.
 * If validation errors exist:
 *   - Responds with HTTP 400 and a structured error array.
 *   - Stops further request processing (controller is never called).
 * If validation passes:
 *   - Calls next() to proceed to the controller.
 *
 * Usage:
 *   router.post("/register", registerValidator, handleValidation, registerUser);
 *
 * @param {import("express").Request}  req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Format errors into a clean array: [{ field, message }]
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  // Validation passed — proceed to next middleware / controller
  next();
};

export default handleValidation;
