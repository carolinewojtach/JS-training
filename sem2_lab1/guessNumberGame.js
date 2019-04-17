const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let range = { min: 1, max: 100 };

class Randomizer {
  constructor(range) {
    this.range = range;
  }
  getRandomNumber() {
    let number =
      Math.floor(Math.random() * (range.max - range.min)) + range.min;
    // console.log("((secret random number: " + number + "))");
    return number;
  }
}

class NumberChecker {
  constructor(randNumber, range, currentAnswer) {
    this.randNumber = randNumber;
    this.range = range;
    this.answer = currentAnswer;
  }

  checkNumber() {
    if (this.randNumber > this.answer) {
      this.range.min = this.answer + 1;
      return { mess: "bigger", range };
    } else if (this.randNumber < this.answer) {
      this.range.max = this.answer - 1;
      return { mess: "smaller", range };
    } else {
      return { mess: "success" };
    }
  }
}

class MainGame {
  constructor(randNumber, range) {
    this.randNumber = randNumber;
    this.range = range;
  }

  guessNumber() {
    console.log("I have a secret number. Try to guess it!");
    let numberOfTries = 8;
    rl.setPrompt("Your guess: ");
    rl.prompt();

    rl.on("line", function(line) {
      if (numberOfTries === 1) {
        console.log("-You lost! My number was: " + randNumber);
        rl.close();
      }
      let answer = line.trim();

      let numberChecker = new NumberChecker(randNumber, range, +answer);
      let test = numberChecker.checkNumber();

      if (test.mess === "bigger") {
        console.log("-Give me bigger!");
        numberOfTries -= 1;
        console.log("-Number of tries left: " + numberOfTries);
      } else if (test.mess === "smaller") {
        console.log("-Give me smaller!");
        numberOfTries -= 1;
        console.log("-Number of tries left: " + numberOfTries);
      } else if (test.mess === "success") {
        console.log("You guessed!");
        rl.close();
      }

      rl.prompt();
    }).on("close", function() {
      process.exit(0);
    });
  }
}

const randomizer = new Randomizer(range);
const randNumber = randomizer.getRandomNumber();

const game = new MainGame(randNumber, range);
game.guessNumber();
