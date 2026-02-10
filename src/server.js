require('dotenv').config();
const createApp = require('./app');
const logger = require('./utils/logger');
const fs = require('fs');
const path = require('path');

// Validate environment variables
const validateEnv = () => {
  const required = ['OFFICIAL_EMAIL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    logger.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  // Validate AI API key
  const hasAIKey = process.env.GEMINI_API_KEY || 
                   process.env.OPENAI_API_KEY || 
                   process.env.ANTHROPIC_API_KEY;
  
  if (!hasAIKey) {
    logger.error('No AI API key configured. Set GEMINI_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY');
    process.exit(1);
  }
};

// Create logs directory if it doesn't exist
const ensureLogsDirectory = () => {
  const logsDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
};

// Graceful shutdown handler
const gracefulShutdown = (server) => {
  return (signal) => {
    logger.info(`${signal} received. Starting graceful shutdown...`);
    
    server.close(() => {
      logger.info('Server closed. Exiting process.');
      process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  };
};

// Start server
const startServer = async () => {
  try {
    // Setup
    ensureLogsDirectory();
    validateEnv();

    // Create app
    const app = createApp();
    const PORT = process.env.PORT || 3000;

    // Start listening
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📧 Official Email: ${process.env.OFFICIAL_EMAIL}`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`🔒 Security: Rate limiting enabled`);
      
      if (process.env.GEMINI_API_KEY) {
        logger.info('🤖 AI Provider: Google Gemini');
      } else if (process.env.OPENAI_API_KEY) {
        logger.info('🤖 AI Provider: OpenAI');
      } else if (process.env.ANTHROPIC_API_KEY) {
        logger.info('🤖 AI Provider: Anthropic Claude');
      }
    });

    // Graceful shutdown handlers
    process.on('SIGTERM', gracefulShutdown(server));
    process.on('SIGINT', gracefulShutdown(server));

    // Uncaught exception handler
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

    // Unhandled rejection handler
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
