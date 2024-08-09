const { check, validationResult } = require("express-validator");

const validateCreateUser = [
  check("name").isString().withMessage("Name must be a string"),
  check("email").isEmail().withMessage("Invalid email format"),
  check("password").isLength({ min: 8 }).withMessage("Password too short"),
  check("role")
    .isIn(["admin", "student", "mentor"])
    .withMessage("Role must be admin, student, or mentor"),
  check("mobile")
    .optional()
    .isNumeric()
    .withMessage("Mobile number must be numeric"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateUser = [
  check("name").optional().isString().withMessage("Name must be a string"),
  check("email").optional().isEmail().withMessage("Invalid email format"),
  check("role")
    .optional()
    .isIn(["admin", "student", "mentor"])
    .withMessage("Role must be admin, student, or mentor"),
  check("mobile")
    .optional()
    .isNumeric()
    .withMessage("Mobile number must be numeric"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validatePassword = [
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateEmailandPassword = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validatePasswordUpdate = [
  check("oldPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  check("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validatePassword,
  validateEmailandPassword,
  validatePasswordUpdate,
};
