//
// This is only a SKELETON file for the 'Difference Of Squares' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const times = (x, fn = (x) => x) =>
  Array.from({length: x}, (el, n) => fn(n+1))

const sumList = (arr) => arr.reduce((acc,n) => acc + n, 0)

export class Squares {
  constructor(max) {
    this.max = max
  }

  get sumOfSquares() {
    return times(this.max, (n) => n*n ).reduce((acc,n) => acc + n, 0)
  }

  get squareOfSum() {
    let sum = sumList(times(this.max))
    return sum * sum
  }

  get difference() {
    return this.squareOfSum - this.sumOfSquares;
  }
}
