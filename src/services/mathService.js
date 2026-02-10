/**
 * Mathematical Operations Service
 * Implements core business logic for mathematical computations
 */

class MathService {
  /**
   * Generates Fibonacci series up to n terms
   * @param {number} n - Number of terms
   * @returns {number[]} Fibonacci series
   */
  static generateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib;
  }

  /**
   * Checks if a number is prime
   * @param {number} num - Number to check
   * @returns {boolean} True if prime
   */
  static isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  }

  /**
   * Filters prime numbers from array
   * @param {number[]} numbers - Array of numbers
   * @returns {number[]} Prime numbers
   */
  static filterPrimes(numbers) {
    return numbers.filter(num => this.isPrime(num));
  }

  /**
   * Calculates GCD of two numbers using Euclidean algorithm
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} GCD
   */
  static gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  /**
   * Calculates HCF (GCD) of an array of numbers
   * @param {number[]} numbers - Array of numbers
   * @returns {number} HCF
   */
  static calculateHCF(numbers) {
    if (numbers.length === 0) return 0;
    if (numbers.length === 1) return Math.abs(numbers[0]);

    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      result = this.gcd(result, numbers[i]);
      if (result === 1) return 1; // Early termination
    }
    return result;
  }

  /**
   * Calculates LCM of two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} LCM
   */
  static lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / this.gcd(a, b);
  }

  /**
   * Calculates LCM of an array of numbers
   * @param {number[]} numbers - Array of numbers
   * @returns {number} LCM
   */
  static calculateLCM(numbers) {
    if (numbers.length === 0) return 0;
    if (numbers.length === 1) return Math.abs(numbers[0]);

    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      result = this.lcm(result, numbers[i]);
    }
    return result;
  }
}

module.exports = MathService;
