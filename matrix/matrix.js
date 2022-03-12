import {lines, tap, traverseGrid, emptyGrid} from './tools';

const transpose = (grid) => {
  const height = grid.length
  const width = grid[0].length

  return tap(emptyGrid({width,height}), (transposed) => {
    for (let [x,y] of traverseGrid({height,width})) {
      transposed[x][y] = grid[y][x]
    }
  })
}

export class Matrix {
  constructor(matrix) {
    this.rawData = matrix
  }

  parse(rawData) {
    return lines(rawData).map((row) => row.match(/\d+/g).map(Number))
  }

  get rows() {
    return this.parse(this.rawData)
  }

  get columns() {
    return transpose(this.rows)
  }

}
