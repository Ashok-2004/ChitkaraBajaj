function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return 1;
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return Math.abs(a);
}

function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a / gcd(a, b)) * b);
}

function gcdArray(arr) {
  return arr.reduce((acc, x) => gcd(acc, x));
}

function lcmArray(arr) {
  return arr.reduce((acc, x) => lcm(acc, x));
}

function checkPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0) return false;
  const r = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= r; i += 2) if (n % i === 0) return false;
  return true;
}

function fibonacciSeries(n) {
  const out = [];
  if (n <= 0) return out;
  let a = 0,
    b = 1;
  for (let i = 0; i < n; i++) {
    out.push(a);
    const t = a + b;
    a = b;
    b = t;
  }
  return out;
}

class MathService {
  static generateFibonacci(n) {
    return fibonacciSeries(n);
  }
  static isPrime(num) {
    return checkPrime(num);
  }
  static filterPrimes(numbers) {
    return numbers.filter((x) => checkPrime(x));
  }
  static gcd(a, b) {
    return gcd(a, b);
  }
  static calculateHCF(numbers) {
    return numbers.length === 0 ? 0 : gcdArray(numbers);
  }
  static lcm(a, b) {
    return lcm(a, b);
  }
  static calculateLCM(numbers) {
    return numbers.length === 0 ? 0 : lcmArray(numbers);
  }
}

module.exports = MathService;
