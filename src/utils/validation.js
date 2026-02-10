const { validationResult } = require('express-validator');

/**
 * Validates request and returns errors if any
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      is_success: false,
      official_email: process.env.OFFICIAL_EMAIL,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

/**
 * Sanitizes and validates input data
 */
const sanitizeInput = {
  isValidInteger: (num) => {
    return Number.isInteger(num) && num >= 0 && num <= 10000;
  },

  isValidIntegerArray: (arr) => {
    if (!Array.isArray(arr) || arr.length === 0 || arr.length > 1000) {
      return false;
    }
    return arr.every(num => Number.isInteger(num) && num > 0 && num <= 100000);
  },

  isValidQuestionString: (str) => {
    return typeof str === 'string' && 
           str.trim().length > 0 && 
           str.length <= 500;
  }
};

module.exports = {
  validateRequest,
  sanitizeInput
};
