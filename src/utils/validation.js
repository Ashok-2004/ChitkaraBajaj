const sanitizeInput = {
  isValidInteger: (num) => {
    return Number.isInteger(num) && num >= 0 && num <= 1000;
  },

  parseInteger: (num) => {
    if (Number.isInteger(num) && num >= 0 && num <= 1000) {
      return { valid: true, value: num };
    }
    if (typeof num === 'string') {
      const parsed = parseInt(num, 10);
      if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 1000 && String(parsed) === String(num).trim()) {
        return { valid: true, value: parsed };
      }
    }
    return { valid: false };
  },

  isValidIntegerArray: (arr) => {
    if (!Array.isArray(arr) || arr.length === 0 || arr.length > 1000) {
      return false;
    }
    return arr.every(num => Number.isInteger(num) && num > 0 && num <= 100000);
  },

  parseIntegerArray: (arr) => {
    const MAX = 1e9;
    if (!Array.isArray(arr) || arr.length === 0 || arr.length > 1000) {
      return { valid: false };
    }
    const result = [];
    for (const num of arr) {
      if (Number.isInteger(num) && Math.abs(num) <= MAX) {
        result.push(num);
      } else if (typeof num === 'string') {
        const parsed = parseInt(num, 10);
        if (!Number.isNaN(parsed) && Math.abs(parsed) <= MAX && String(parsed) === String(num).trim()) {
          result.push(parsed);
        } else {
          return { valid: false };
        }
      } else {
        return { valid: false };
      }
    }
    return { valid: true, value: result };
  },

  isValidQuestionString: (str) => {
    return typeof str === 'string' && str.trim().length > 0 && str.length <= 500;
  }
};

module.exports = {
  sanitizeInput
};
