import { body } from "express-validator";

const updateSettingsValidator = [
  body("autoEmissionCalculation")
    .optional()
    .isBoolean()
    .withMessage("autoEmissionCalculation must be a boolean"),
  body("evidenceRequired")
    .optional()
    .isBoolean()
    .withMessage("evidenceRequired must be a boolean"),
  body("badgeAutoAward")
    .optional()
    .isBoolean()
    .withMessage("badgeAutoAward must be a boolean"),
  body("notificationSettings")
    .optional()
    .isObject()
    .withMessage("notificationSettings must be an object"),
  body("notificationSettings.email")
    .optional()
    .isBoolean()
    .withMessage("notificationSettings.email must be a boolean"),
  body("notificationSettings.push")
    .optional()
    .isBoolean()
    .withMessage("notificationSettings.push must be a boolean"),
  body("notificationSettings.inApp")
    .optional()
    .isBoolean()
    .withMessage("notificationSettings.inApp must be a boolean"),
  body("environmentalWeight")
    .optional()
    .isFloat({ min: 0, max: 1 })
    .withMessage("environmentalWeight must be a number between 0 and 1"),
  body("socialWeight")
    .optional()
    .isFloat({ min: 0, max: 1 })
    .withMessage("socialWeight must be a number between 0 and 1"),
  body("governanceWeight")
    .optional()
    .isFloat({ min: 0, max: 1 })
    .withMessage("governanceWeight must be a number between 0 and 1"),
];

export { updateSettingsValidator };
