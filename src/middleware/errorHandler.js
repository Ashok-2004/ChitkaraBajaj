const logger = require('../utils/logger');

class APIError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError';
  }
}

const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    is_success: false,
    official_email: process.env.OFFICIAL_EMAIL || 'your_email@chitkara.edu.in',
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    is_success: false,
    official_email: process.env.OFFICIAL_EMAIL || 'your_email@chitkara.edu.in',
    error: 'Endpoint not found'
  });
};

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  APIError,
  errorHandler,
  notFoundHandler,
  asyncHandler
};
