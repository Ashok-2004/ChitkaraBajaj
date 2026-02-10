const winston = require('winston');

// Vercel-compatible logger (no file system access)
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Console transport only (works on Vercel)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Remove file transports in production/Vercel
if (process.env.NODE_ENV !== 'production') {
  // Only use file logging in local development
  const fs = require('fs');
  const path = require('path');
  
  const logDir = 'logs';
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  logger.add(new winston.transports.File({
    filename: path.join(logDir, 'error.log'),
    level: 'error'
  }));

  logger.add(new winston.transports.File({
    filename: path.join(logDir, 'combined.log')
  }));
}

module.exports = logger;