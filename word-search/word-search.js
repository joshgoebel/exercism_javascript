class WordSearch {
  #grid

  constructor(grid) {
    this.#grid = new Grid(grid)
  }

  find(words) {
    let positions = {}
    for (let word of words) {
      positions[word] = this.#findWord(word)
    }
    return positions
  }

  #wordAt(word, {x,y}, vector) {
    let cursor = new Cursor({x,y}, { direction: vector })
    cursor.rewind(); // get ready
    for (let letter of word) {
      cursor.advance();
      if (letter !== this.#grid.letterAt(cursor))
        return;
    }

    return {
      // test want the coordinate system a very specific way, so convert it
      start: toOneBasedYXCoordSystem({x,y}),
      end: toOneBasedYXCoordSystem(cursor),
    }
  }

  #findWord(word) {
    let result
    let firstLetter = word[0]
    this.#grid.traverseUntilFind((x,y) => {
      // first make sure we match the first character
      // to avoid a bunch of needless vector searching
      if (firstLetter !== this.#grid.letterAt({x,y})) return;

      VECTORS.find(vec => {
        return result = this.#wordAt(word, {x,y}, vec)
      })
      // for (let vec of VECTORS) {
      //   if (result = this.#wordAt(word, {x,y}, vec)) {
      //     return true;
      //   }
      // }
    })
    return result
  }

}

const VECTORS = [
  {x:1 ,y:0},   // left-to-right
  {x:-1 ,y:0},  // right-to-left
  {x:0 ,y:1},   // top-to-bottom
  {x:0 ,y:-1},  // bottom to top
  {x:1 ,y:1},   // top left to bottom right
  {x:-1 ,y:-1}, // bottom right to top left
  {x:1 ,y:-1},  // bottom left to top right
  {x:-1 ,y:1}   // top right to bottom left
]

class Grid {
  #grid

  constructor(textGrid) {
    this.#grid = textGrid
  }

  letterAt({x, y}) {
    if (!this.#grid[y]) return undefined

    return this.#grid[y][x]
  }

  // walks the grid but stops when `fn` returns true
  traverseUntilFind(fn) {
    this.#grid.find((_,y) => {
      return [...this.#grid[0]].find((_, x) => {
        return fn(x,y)
      })
    })
  }
}

function toOneBasedYXCoordSystem(cursor) {
  let {x,y} = cursor
  return [y+1,x+1]
}

const FORWARD = 1
const BACKWARD = -1

class Cursor {
  constructor({x,y}, {direction}) {
    this.x = x
    this.y = y
    this.direction = direction
  }
  advance(flip = FORWARD) {
    this.x += this.direction.x * flip
    this.y += this.direction.y * flip
  }
  rewind() { this.advance(BACKWARD) }
}

export default WordSearch;

