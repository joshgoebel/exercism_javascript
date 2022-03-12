const Z_CHARCODE = "z".charCodeAt(0)
const ALPHABET_SIZE = 26

const rotateLetter = (letter, {shiftBy}) => {
  const wasUpper = letter.match(/[A-Z]/)
  let shifted = letter.toLowerCase().charCodeAt(0) + shiftBy;
  if (shifted > Z_CHARCODE) shifted -= ALPHABET_SIZE;

  let result = String.fromCodePoint(shifted)
  return  wasUpper ? result.toUpperCase() : result;
}

export class RotationalCipher {
  static rotate(phrase, shiftBy) {
    shiftBy = shiftBy % ALPHABET_SIZE
    return phrase.replace(/[a-z]/ig,(letter) => {
      return rotateLetter(letter, {shiftBy})
    })
  }

}
