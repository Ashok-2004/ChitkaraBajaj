const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const routes = require('./routes');
const { 
  createRateLimiter, 
  securityHeaders, 
  sanitizeRequest, 
  requestLogger 
} = require('./middleware/security');
const { 
  errorHandler, 
  notFoundHandler 
} = require('./middleware/errorHandler');
const logger = require('./utils/logger');

/**
 * Create and configure Express application
 */
const createApp = () => {
  const app = express();

  // Trust proxy for accurate IP addresses (important for rate limiting)
  app.set('trust proxy', 1);

  // Security middleware
  app.use(securityHeaders);
  app.use(helmet());

  // CORS configuration
  const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS === '*' 
      ? '*' 
      : process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    maxAge: 86400 // 24 hours
  };
  app.use(cors(corsOptions));

  // Body parsing
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Compression
  app.use(compression());

  // Request sanitization
  app.use(sanitizeRequest);

  // Request logging
  app.use(requestLogger);

  // Rate limiting
  const rateLimiter = createRateLimiter();
  app.use(rateLimiter);

  // Health check endpoint (before rate limiting for monitoring)
  app.get('/health', (req, res) => {
    res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // API Routes
  app.use('/', routes);

  // 404 handler
  app.use(notFoundHandler);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
