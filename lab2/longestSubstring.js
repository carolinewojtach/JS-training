const _ = require("lodash");

class SubstringsPicker {
  static getSubstrings(text) {
    let substringsList = [];
    for (let i = 0; i < text.length; i++) {
      let substring = text.substr(i, text.length);
      substring.length > 1 ? substringsList.push(substring) : null;
      for (let k = 1; k < substring.length; k++) {
        let substring2 = substring.substr(k, substring.length);
        substring2.length > 1 ? substringsList.push(substring2) : null;
      }
    }
    for (let j = text.length; j >= 0; j--) {
      let substring = text.substr(0, j);
      substring.length > 1 ? substringsList.push(substring) : null;
      for (let m = 1; m < substring.length; m++) {
        let substring2 = substring.substr(m, substring.length);
        substring2.length > 1 ? substringsList.push(substring2) : null;
      }
    }
    let uniqueSubstringList = [...new Set(substringsList)]; // remove duplicates from array
    return uniqueSubstringList;
  }
}

class LongestSubstring {
  static findLongestSubstring(text1, text2) {
    // all substrings from text1
    let substrings1 = SubstringsPicker.getSubstrings(text1);
    console.log(substrings1);

    // all substring from text2
    let substrings2 = SubstringsPicker.getSubstrings(text2);
    console.log(substrings2);

    // common substrings
    let commonSubstrings = _.intersection(substrings1, substrings2);
    console.log(commonSubstrings);

    // longest substring
    let longestSubstring = "";
    commonSubstrings.forEach(e =>
      e.length > longestSubstring.length ? (longestSubstring = e) : e
    );
    return longestSubstring;
  }
}

let result = LongestSubstring.findLongestSubstring("karol", "rolki");
console.log(`longest substring is: ${result}`);
