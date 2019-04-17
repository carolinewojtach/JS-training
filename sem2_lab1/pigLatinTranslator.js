class PigLatinTranslator {
  static getTextTranslated(text) {
    let textSplit = [];
    textSplit = text.split(" ");

    let pigLatinText = [];
    for (let i = 0; i < textSplit.length; i++) {
      let eachFirstLetter = textSplit[i][0]; // get first letter
      let currentWord = textSplit[i].split("");

      currentWord.splice(0, 1); //remove first letter
      currentWord.push(eachFirstLetter, "ay"); //add first letter to end
      currentWord = currentWord.join("");
      pigLatinText.push(currentWord);
    }

    // change first letter to big
    let pigLatinTextString = pigLatinText.join("").toLowerCase();
    let pigLatinTextCapitalized =
      pigLatinTextString.charAt(0).toUpperCase() + pigLatinTextString.slice(1);

    return pigLatinTextCapitalized;
  }
}

let text = "The quick brown fox";

let pigLatinText = PigLatinTranslator.getTextTranslated(text);
console.log(pigLatinText);
