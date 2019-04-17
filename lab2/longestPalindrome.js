function isPalindrome(input) {
  let rev = input
    .split("")
    .reverse()
    .join("");
  return input == rev;
}

function longestPalindrome(input) {
  let max_length = 0,
    maxPalindrome = "";

  for (let i = 0; i < input.length; i++) {
    let subs = input.substr(i, input.length);

    for (let j = subs.length; j >= 0; j--) {
      let sub_subs_str = subs.substr(0, j);
      if (sub_subs_str.length <= 1) continue;

      if (isPalindrome(sub_subs_str)) {
        if (sub_subs_str.length > max_length) {
          max_length = sub_subs_str.length;
          maxPalindrome = sub_subs_str;
        }
      }
    }
  }

  return maxPalindrome;
}
console.log(longestPalindrome("kajak"));
