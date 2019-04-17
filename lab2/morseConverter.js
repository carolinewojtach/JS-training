const alphabet = require( "./alphabetMorse" )

class Converter {
  static convertToMorse(input) {
    input  = input.toLowerCase()
    let morseText = "";
    for (let i = 0; i < input.length; i++) {
      let foundLetter = alphabet.find(e => e.letter === input[i]);

      if (foundLetter !== undefined) {
        i === input.length - 1
          ? (morseText += foundLetter.morse)
          : (morseText += foundLetter.morse + " ");
      } else {
        console.log("Urecognisable character: " + input[i]);
      }
    }
    return morseText;
  }
  
  static convertToText(input) {
    input  = input.toLowerCase()
    let normalText = "";
    let letters = input.split(" ");

    for (let i = 0; i < letters.length; i++) {
      let foundLetter = alphabet.find(e => e.morse === letters[i]);

      if (foundLetter !== undefined) {
        normalText += foundLetter.letter;
      } else {
        console.log("Urecognisable character: " + input[i]);
      }
    }
    return normalText;
  }
}

// convert to morse
const inputText = "Ala ma kota";
const morseText = Converter.convertToMorse(inputText);
console.log(morseText);

// convert to normal text
const inputMorse = ".- .-.. .- / -- .- / -.- --- - .-";
const normalText = Converter.convertToText(inputMorse);
console.log(normalText);
