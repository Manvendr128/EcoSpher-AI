import { body } from "express-validator";

const createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .trim(),
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["CSR Activity", "Challenge"])
    .withMessage("Type must be either 'CSR Activity' or 'Challenge'"),
  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be either 'Active' or 'Inactive'"),
];

const updateCategoryValidator = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .trim(),
  body("type")
    .optional()
    .isIn(["CSR Activity", "Challenge"])
    .withMessage("Type must be either 'CSR Activity' or 'Challenge'"),
  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be either 'Active' or 'Inactive'"),
];

export { createCategoryValidator, updateCategoryValidator };
