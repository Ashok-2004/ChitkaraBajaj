const MathService = require('../services/mathService');
const AIService = require('../services/aiService');
const { sanitizeInput } = require('../utils/validation');
const { APIError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');

class BFHLController {
  constructor() {
    this.aiService = new AIService();
  }

  async handlePost(req, res) {
    const requestBody = req.body || {};
    const keys = Object.keys(requestBody);
    const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
    const receivedValidKeys = keys.filter(k => validKeys.includes(k));

    if (receivedValidKeys.length === 0) {
      throw new APIError('Request must contain one of: fibonacci, prime, lcm, hcf, AI', 400);
    }

    if (receivedValidKeys.length > 1) {
      throw new APIError('Request must contain exactly one operation key', 400);
    }

    const operationKey = receivedValidKeys[0];
    const inputData = requestBody[operationKey];

    let data;
    switch (operationKey) {
      case 'fibonacci':
        data = this.handleFibonacci(inputData);
        break;
      case 'prime':
        data = this.handlePrime(inputData);
        break;
      case 'lcm':
        data = this.handleLCM(inputData);
        break;
      case 'hcf':
        data = this.handleHCF(inputData);
        break;
      case 'AI':
        data = await this.handleAI(inputData);
        break;
    }

    return res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL || "your_email@chitkara.edu.in",
      data
    });
  }

  handleFibonacci(input) {
    const parsed = sanitizeInput.parseInteger(input);
    if (!parsed.valid) {
      throw new APIError('fibonacci must be an integer between 0 and 1000', 400);
    }
    logger.info(`Generating Fibonacci series for n=${parsed.value}`);
    return MathService.generateFibonacci(parsed.value);
  }

  handlePrime(input) {
    const parsed = sanitizeInput.parseIntegerArray(input);
    if (!parsed.valid) {
      throw new APIError('Prime input must be an array of positive integers (max 1000 elements, each ≤100000)', 400);
    }
    logger.info(`Filtering primes from array of ${parsed.value.length} numbers`);
    return MathService.filterPrimes(parsed.value);
  }

  handleLCM(input) {
    const parsed = sanitizeInput.parseIntegerArray(input);
    if (!parsed.valid) {
      throw new APIError('LCM input must be an array of positive integers (max 1000 elements, each ≤100000)', 400);
    }
    logger.info(`Calculating LCM for array of ${parsed.value.length} numbers`);
    return MathService.calculateLCM(parsed.value);
  }

  handleHCF(input) {
    const parsed = sanitizeInput.parseIntegerArray(input);
    if (!parsed.valid) {
      throw new APIError('HCF input must be an array of positive integers (max 1000 elements, each ≤100000)', 400);
    }
    logger.info(`Calculating HCF for array of ${parsed.value.length} numbers`);
    return MathService.calculateHCF(parsed.value);
  }

  async handleAI(input) {
    if (!sanitizeInput.isValidQuestionString(input)) {
      throw new APIError('AI must be a string question', 400);
    }

    try {
      const answer = await this.aiService.getAnswer(input);
      return answer;
    } catch (error) {
      logger.error('AI failed, returning fallback:', error);
      return 'Unknown';
    }
  }
}

module.exports = BFHLController;
