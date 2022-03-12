// to ease line equality comparisons
// [2,9] => "2/9"
const lineToString = ([a,b]) => `${a}/${b}`

class Rectangles {
  #rows
  HORIZONTAL_LINE_RE = /^\+[+-]*\+$/ // corners `+` or line segments `-`
  VERTICAL_LINE_RE = /^\+[+|]*\+$/ // corners `+` or line segments `|`

  constructor(data) {
    this.#rows = data
  }
  #confirmSquare([topLeft, bottomRight]) {
    let [x1, y1] = topLeft;
    let [x2, y2] = bottomRight;

    let leftSide = this.#rows.slice(y1,y2+1).map(s => s[x1]).join("")
    let rightSide = this.#rows.slice(y1,y2+1).map(s => s[x2]).join("")

    // our algorithms finds pairs of top and bottom lines to pass to
    // us for analysis so we only need to check if the left and right
    // sides are contiguous lines segments or not
    return (leftSide + rightSide).match(this.VERTICAL_LINE_RE)
  }
  * #parallelHorizontalLines() {
    let linesPerRow = this.#rows.map(row => Rectangles.#linesForRow(row))
    for (let startY = 0; startY < this.#height; startY++) {
      const startLines = linesPerRow[startY]
      for (let endY = startY+1; endY < this.#height; endY++) {
        const finishLines = linesPerRow[endY]
        for (let startLine of startLines) {
          const lineDesc = lineToString(startLine)
          if (finishLines.map(finishLine => lineToString(finishLine)).includes(lineDesc)) {
            yield [
              {
                horizontal: startLine,
                vertical: [startY, endY]
              }
            ]
          }
        }
      }
    }
  }
  static #horizontalLinesToBox(parallel) {
    let [{
      vertical: [y0,y1],
      horizontal: [x0,x1]
    }] = parallel
    return [[x0,y0],[x1,y1]]
  }
  count() {
    let n = 0
    for (let parallel of this.#parallelHorizontalLines()) {
      const bounds = Rectangles.#horizontalLinesToBox(parallel)
      if (this.#confirmSquare(bounds)) {
        n++;
      }
    }
    return n
  }

  get #height() { return this.#rows.length }

  static #cornerIndexes(row) {
    return [...row.matchAll(/\+/g)].map(x => x.index)
  }
  static #isHorizontalLine(row, [start, end]) {
    return row
      .slice(start, end+1)
      .match(this.LINE_RE)
  }
  static #linesForRow(row) {
    let indexes = Rectangles.#cornerIndexes(row)
    if (indexes<2) return []

    return indexes.reduce((lines, lineStart) => {
      indexes.forEach((lineEnd) => {
        if (lineEnd > lineStart && Rectangles.#isHorizontalLine(row, [lineStart,lineEnd]))
          lines.push([lineStart,lineEnd])
      })
      return lines
    },[])
  }
}

export function count(data) {
  return new Rectangles(data).count()
}

