const { GoogleGenerativeAI } = require('@google/generative-ai');
const logger = require('../utils/logger');

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  logger.warn('Missing GEMINI_API_KEY environment variable');
}

const ai = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

async function askGemini(prompt) {
  if (!ai || !API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const model = ai.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction:
      'You are a concise assistant. Respond with exactly one word. No punctuation, no sentences.',
  });

  try {
    const result = await model.generateContent(prompt + ' (One word only)');
    const response = await result.response;
    const text = response.text().trim();
    const word = text.split(/\s+/)[0].replace(/[^a-zA-Z0-9]/g, '');
    return word || 'Unknown';
  } catch (error) {
    logger.error('AI Error:', error.message);
    throw new Error('AI Error');
  }
}

class AIService {
  async getAnswer(question) {
    return askGemini(question);
  }
}

module.exports = AIService;
module.exports.askGemini = askGemini;
