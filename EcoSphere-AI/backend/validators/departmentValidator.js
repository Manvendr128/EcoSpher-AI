import { body } from "express-validator";

const createDepartmentValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .trim(),
  body("code")
    .notEmpty()
    .withMessage("Code is required")
    .trim(),
  body("head")
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid Head User ID"),
  body("parentDepartment")
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid Parent Department ID"),
  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be either Active or Inactive"),
];

const updateDepartmentValidator = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .trim(),
  body("code")
    .optional()
    .notEmpty()
    .withMessage("Code cannot be empty")
    .trim(),
  body("head")
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid Head User ID"),
  body("parentDepartment")
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid Parent Department ID"),
  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be either Active or Inactive"),
];

export { createDepartmentValidator, updateDepartmentValidator };
