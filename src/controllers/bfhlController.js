const MathService = require('../services/mathService');
const AIService = require('../services/aiService');
const { sanitizeInput } = require('../utils/validation');
const { APIError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');

/**
 * Controller for /bfhl endpoint
 */
class BFHLController {
  constructor() {
    this.aiService = new AIService();
  }

  /**
   * Main POST handler
   */
  async handlePost(req, res) {
    const requestBody = req.body;

    // Validate that exactly one key is present
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

    // Route to appropriate handler
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

    // Success response
    return res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      data
    });
  }

  /**
   * Handle Fibonacci operation
   */
  handleFibonacci(input) {
    if (!sanitizeInput.isValidInteger(input)) {
      throw new APIError('Fibonacci input must be a positive integer (0-10000)', 400);
    }

    logger.info(`Generating Fibonacci series for n=${input}`);
    return MathService.generateFibonacci(input);
  }

  /**
   * Handle Prime filtering operation
   */
  handlePrime(input) {
    if (!sanitizeInput.isValidIntegerArray(input)) {
      throw new APIError('Prime input must be an array of positive integers (max 1000 elements, each ≤100000)', 400);
    }

    logger.info(`Filtering primes from array of ${input.length} numbers`);
    return MathService.filterPrimes(input);
  }

  /**
   * Handle LCM calculation
   */
  handleLCM(input) {
    if (!sanitizeInput.isValidIntegerArray(input)) {
      throw new APIError('LCM input must be an array of positive integers (max 1000 elements, each ≤100000)', 400);
    }

    logger.info(`Calculating LCM for array of ${input.length} numbers`);
    return MathService.calculateLCM(input);
  }

  /**
   * Handle HCF calculation
   */
  handleHCF(input) {
    if (!sanitizeInput.isValidIntegerArray(input)) {
      throw new APIError('HCF input must be an array of positive integers (max 1000 elements, each ≤100000)', 400);
    }

    logger.info(`Calculating HCF for array of ${input.length} numbers`);
    return MathService.calculateHCF(input);
  }

  /**
   * Handle AI question
   */
  async handleAI(input) {
    if (!sanitizeInput.isValidQuestionString(input)) {
      throw new APIError('AI input must be a non-empty string (max 500 characters)', 400);
    }

    logger.info(`Processing AI question: "${input.substring(0, 50)}..."`);
    
    try {
      const answer = await this.aiService.getAnswer(input);
      return answer;
    } catch (error) {
      logger.error('AI processing failed:', error);
      throw new APIError('Failed to process AI request', 503);
    }
  }
}

module.exports = BFHLController;
