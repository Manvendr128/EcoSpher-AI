import { body } from "express-validator";

/**
 * Register Validation Rules
 *
 * Validates the request body for the user registration endpoint.
 * Checks: name, email, password
 */
const registerValidator = [
  // Name: required, string, min 3 chars
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  // Email: required, valid format
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  // Password: required, min 6 chars
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

/**
 * Login Validation Rules
 *
 * Validates the request body for the user login endpoint.
 * Checks: email, password
 */
const loginValidator = [
  // Email: required, valid format
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  // Password: required
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

export { registerValidator, loginValidator };
