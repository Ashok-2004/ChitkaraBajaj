const express = require('express');
const BFHLController = require('../controllers/bfhlController');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();
const bfhlController = new BFHLController();

/**
 * POST /bfhl
 * Main processing endpoint
 */
router.post('/bfhl', asyncHandler(async (req, res) => {
  await bfhlController.handlePost(req, res);
}));

/**
 * GET /health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * GET /
 * Root endpoint - API documentation
 */
router.get('/', (req, res) => {
  res.status(200).json({
    name: 'Chitkara Qualifier API',
    version: '1.0.0',
    endpoints: {
      'POST /bfhl': 'Main processing endpoint',
      'GET /health': 'Health check endpoint'
    },
    documentation: 'https://github.com/yourusername/chitkara-qualifier-api'
  });
});

module.exports = router;
