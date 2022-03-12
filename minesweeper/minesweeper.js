import { Grid } from "./grid.js"

const MINE = "*"
const BLANK = " "
const isMine = (icon) => icon == MINE

export const annotate = (board) => {
	let grid = new Grid(board.map((row) => [...row]))
	grid.visitEachSquare((coordinates,contents) => {
		if (isMine(contents)) { return }

		let nearbyBombs = grid
			.cellsAdjacentTo(coordinates)
			.filter(isMine)
			.length

		grid.setSquare(coordinates, nearbyBombs || BLANK)
	})

	return grid.toString()
}