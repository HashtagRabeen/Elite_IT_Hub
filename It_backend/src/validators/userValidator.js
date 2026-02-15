const { body } = require("express-validator");

exports.registerValidation = [
  body("name")
    .notEmpty().withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail().withMessage("Invalid email"),

  body("phone")
    .isNumeric().withMessage("Phone must be numeric")
    .isLength({ min: 10 }).withMessage("Phone must be at least 10 digits"),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  body("role")
    .notEmpty().withMessage("Role is required"),
];

exports.loginValidation = [
  body("email")
    .trim()
    .isEmail().withMessage("Invalid email"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];
