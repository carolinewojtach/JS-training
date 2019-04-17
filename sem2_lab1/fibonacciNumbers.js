class FibonacciNumbers {
  constructor(amountOfNumbers) {
    this.amountOfNumbers = amountOfNumbers;
  }
  getNumbers() {
    let numbers = [1, 1];
    for (let i = 0; i < this.amountOfNumbers; i++) {
      let lastElement = numbers[numbers.length - 1];
      let lastElement2 = numbers[numbers.length - 2];
      numbers.push(lastElement + lastElement2);
    }
    return numbers;
  }
}

let amountOfNumbers = 12;

let fibonacciNumbers = new FibonacciNumbers(amountOfNumbers);
let newFibonacciNumbers = fibonacciNumbers.getNumbers();
console.log(newFibonacciNumbers);
