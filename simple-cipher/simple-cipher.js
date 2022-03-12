const LETTER_A_CODE = "a".charCodeAt(0)
const ALPHABET_SIZE = 26
const DEFAULTS = {
  keyLength: 100
}
const [RIGHT, LEFT] = [Symbol(), Symbol()]

// normalize alphabet values A => 0, Z => 25, and vise-versa
const alphabetValue = (char) => char.charCodeAt(0) - LETTER_A_CODE
const valueToAlphabet = (value) => String.fromCharCode(value + LETTER_A_CODE)
const random = (max) => Math.floor((Math.random() * max))

export class Cipher {
  constructor(key) {
    this._key = key || this._randomKey()
  }

  _randomKey() {
    return Array.from({length: DEFAULTS.keyLength},
      () => random(ALPHABET_SIZE))
      .map(valueToAlphabet).join("")
  }

  encode(message) {
    return this._coder(message, {shift: RIGHT})
  }

  decode(encodedMessage) {
    return this._coder(encodedMessage, {shift: LEFT})
  }

  _coder(message, {shift}) {
    return [...message].map((char, i) => {
      return this.encodeLetter(char, i, shift)
    }).join("")
  }

  _offsetCharacter(char, amount) {
    return valueToAlphabet((alphabetValue(char) + amount + ALPHABET_SIZE) % ALPHABET_SIZE)
  }

  encodeLetter(char, i, shiftDirection) {
    let sign = shiftDirection == RIGHT ? +1 : -1
    let offset = this._keyOffsetAtIndex(i) * sign
    return this._offsetCharacter(char, offset)
  }

  _keyOffsetAtIndex(i) {
    return alphabetValue(this.key[i % this.key.length])
  }

  get key() {
    return this._key
  }
}
