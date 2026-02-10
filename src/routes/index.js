const express = require('express');
const BFHLController = require('../controllers/bfhlController');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();
const bfhlController = new BFHLController();

router.post('/bfhl', asyncHandler(async (req, res) => {
  await bfhlController.handlePost(req, res);
}));

router.get('/bfhl', (req, res) => {
  res.status(405).json({
    is_success: false,
    official_email: process.env.OFFICIAL_EMAIL || 'your_email@chitkara.edu.in',
    error: 'Method Not Allowed: use POST /bfhl with a JSON body containing exactly one of {fibonacci, prime, lcm, hcf, AI}',
  });
});

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
