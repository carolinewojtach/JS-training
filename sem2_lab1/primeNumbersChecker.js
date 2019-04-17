class PrimeNumbersChecker {
  static findPrimesInRange(range) {
    // Sieve of Eratosthenes
    let numbers = [];
    for (let i = range.min; i <= range.max; i++) {
      numbers.push(i);
    }
    let squareRoot = Math.ceil(Math.sqrt(range.max));

    let dividers = [];
    for (let i = 2; i <= squareRoot; i++) {
      dividers.push(i);
    }

    for (let i = 0; i < dividers.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        let remainder = numbers[j] % dividers[i];
        if (remainder === 0) {
          numbers[j] = 0;
        }
      }
    }

    return numbers.filter(num => num !== 0);
  }
}
const range = { min: 12, max: 74 };
let primes = PrimeNumbersChecker.findPrimesInRange(range);
console.log("Prime numbers: " + primes);
