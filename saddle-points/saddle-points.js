// converts row/col 0-based into 1-based coordinates
const saddlepoint = (y,x) => ({ column: x + 1, row: y + 1 })

export const saddlePoints = (matrix) => {
  const smallest = []
  const column = (x) => matrix.map(row => row[x])
  const smallestOf = (columnId) =>
    smallest[columnId] ??= Math.min(...column(columnId))

  // loop over rows
  //   loop over columns
  //     if value is largest of row && smallest of column
  //       add saddle point
  return matrix.reduce((points,row,rowId) => {
    const largestOfRow = Math.max(...row)
    row.forEach((n,columnId) => {
      if (n === largestOfRow && n === smallestOf(columnId)) {
          points.push(saddlepoint(rowId, columnId))
        }
      }
    )
    return points
  }, [])
};
