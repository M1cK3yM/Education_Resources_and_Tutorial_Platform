const { check, validationResult } = require('express-validator');

// Validation for creating a resource
const validateCreateResource = [
  check('title').notEmpty().withMessage('Title is required'),
  check('description').optional().isString().withMessage('Description must be a string'),
  check('type').optional().isString().withMessage('Type must be a string'),
  check('url').optional().isURL().withMessage('Invalid URL'),
  check('tags').optional().isArray().withMessage('Tags must be an array'),
  check('createdBy').optional().isMongoId().withMessage('Invalid user ID'),
  check('createdAt').optional().isISO8601().withMessage('Invalid date format'),
  check('updatedAt').optional().isISO8601().withMessage('Invalid date format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation for updating a resource
const validateUpdateResource = [
  check('title').optional().notEmpty().withMessage('Title cannot be empty'),
  check('description').optional().isString().withMessage('Description must be a string'),
  check('type').optional().isString().withMessage('Type must be a string'),
  check('url').optional().isURL().withMessage('Invalid URL'),
  check('tags').optional().isArray().withMessage('Tags must be an array'),
  check('createdBy').optional().isMongoId().withMessage('Invalid user ID'),
  check('createdAt').optional().isISO8601().withMessage('Invalid date format'),
  check('updatedAt').optional().isISO8601().withMessage('Invalid date format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateCreateResource,
  validateUpdateResource
};
