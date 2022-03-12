// Tile vales in Scrabble
//
// A, E, I, O, U, L, N, R, S, T       1
// D, G                               2
// B, C, M, P                         3
// F, H, V, W, Y                      4
// K                                  5
// J, X                               8
// Q, Z                               10

const TILE_VALUES = new Map([
  ["A", 1], ["E", 1], ["I", 1], ["O", 1], ["U", 1], ["L", 1], ["N", 1], ["R", 1], ["S", 1], ["T", 1],
  ["D", 2], ["G", 2],
  ["B", 3], ["C", 3], ["M", 3], ["P", 3],
  ["F", 4], ["H", 4], ["V", 4], ["W", 4], ["Y", 4],
  ["K", 5],
  ["J", 8], ["X", 8],
  ["Q", 10], ["Z", 10],
])

export const score = (word) => {
  return sum(tiles(word), {using: scoreTile})
};

const sum = (list, {using: fn}) => list.reduce((acc,el) => acc + fn(el),0 )
const scoreTile = (tile) => TILE_VALUES.get(tile) || 0
const tiles = (word) => [...word.toUpperCase()]


const bonusMultiple = (x) => x + 1
export const scoreBonus = word => {
  let lastLetter
  let repeatedRun = 0

  return [...word.toUpperCase()].reduce((score, letter) => {
    lastLetter == letter
      ? repeatedRun += 1
      : repeatedRun = 0

    const acc = scoreTile(letter) * bonusMultiple(repeatedRun) + score
    lastLetter = letter
    return acc
  }, 0)
}

