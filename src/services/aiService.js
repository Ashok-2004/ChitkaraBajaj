const axios = require('axios');
const logger = require('../utils/logger');

/**
 * AI Service supporting multiple providers
 * Implements adapter pattern for different AI APIs
 */
class AIService {
  constructor() {
    this.provider = this.detectProvider();
  }

  /**
   * Detects which AI provider is configured
   */
  detectProvider() {
    if (process.env.GEMINI_API_KEY) return 'gemini';
    if (process.env.OPENAI_API_KEY) return 'openai';
    if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
    throw new Error('No AI API key configured. Please set GEMINI_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY');
  }

  /**
   * Gets single-word answer from AI
   * @param {string} question - Question to ask
   * @returns {Promise<string>} Single-word answer
   */
  async getAnswer(question) {
    try {
      switch (this.provider) {
        case 'gemini':
          return await this.queryGemini(question);
        case 'openai':
          return await this.queryOpenAI(question);
        case 'anthropic':
          return await this.queryAnthropic(question);
        default:
          throw new Error('Invalid AI provider');
      }
    } catch (error) {
      logger.error('AI Service Error:', error);
      throw new Error('Failed to get AI response');
    }
  }

  /**
   * Query Google Gemini API
   */
  async queryGemini(question) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const prompt = `Answer the following question with ONLY a single word. Do not provide any explanation, context, or additional words. Just the answer word.

Question: ${question}

Answer:`;

    const response = await axios.post(url, {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 10
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!answer) throw new Error('No response from Gemini');
    
    // Extract first word
    return answer.split(/\s+/)[0].replace(/[^a-zA-Z]/g, '');
  }

  /**
   * Query OpenAI API
   */
  async queryOpenAI(question) {
    const url = 'https://api.openai.com/v1/chat/completions';
    
    const response = await axios.post(url, {
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'system',
        content: 'You are a helpful assistant that answers questions with ONLY a single word. No explanations, no additional context.'
      }, {
        role: 'user',
        content: question
      }],
      temperature: 0.1,
      max_tokens: 10
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    const answer = response.data?.choices?.[0]?.message?.content?.trim();
    if (!answer) throw new Error('No response from OpenAI');
    
    return answer.split(/\s+/)[0].replace(/[^a-zA-Z]/g, '');
  }

  /**
   * Query Anthropic Claude API
   */
  async queryAnthropic(question) {
    const url = 'https://api.anthropic.com/v1/messages';
    
    const response = await axios.post(url, {
      model: 'claude-3-haiku-20240307',
      max_tokens: 10,
      messages: [{
        role: 'user',
        content: `Answer with ONLY a single word: ${question}`
      }]
    }, {
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    const answer = response.data?.content?.[0]?.text?.trim();
    if (!answer) throw new Error('No response from Anthropic');
    
    return answer.split(/\s+/)[0].replace(/[^a-zA-Z]/g, '');
  }
}

module.exports = AIService;
