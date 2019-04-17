class DigitsDivider {
  constructor(element) {
    this.element = element;
  }

  getDigits() {
    let digits = [];
    if (typeof element === "number") {
      digits = this.element.toString().split("");
      digits = digits.map(Number);
    } else if (typeof element === "string") {
      digits = this.element.split("");
      digits = digits.filter(e => e !== " "); //remove spaces
    } else {
      return "Bad type of element.";
    }

    return digits;
  }
}

const element = "ala ma kota";

let digitsDivider = new DigitsDivider(element);
let digits = digitsDivider.getDigits();
console.log(digits);
