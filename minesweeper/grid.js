export const EMPTY = " "

export class Grid {
	constructor(grid) {
		this.grid = grid
	}

	get width() {
		return this.grid[0].length
	}

	get height() {
		return this.grid.length
	}

	toString() {
		return this.grid.map((row) => row.join(""))
	}

	setSquare([x,y],icon) {
		this.grid[y][x] = icon
	}

	getSquare([x,y]) {
		if (x<0 || y<0 || x>= this.width || y>= this.height) {
			return EMPTY
		}
		return this.grid[y][x];
	}

	cellsAdjacentTo([xc,yc]) {
		let list = []
		for (let y=Math.max(yc-1,0); y<=Math.min(yc+1,this.height); y++) {
			for (let x=Math.max(xc-1,0); x<=Math.min(xc+1,this.width); x++) {
				if (!(x == xc && y == yc)) {
					list.push(this.getSquare([x,y]))
				}
			}
		}
		return list
	}

	visitEachSquare(fn) {
		for (let y=0; y<this.height; y++) {
			for (let x=0; x<this.width; x++) {
				fn([x,y], this.getSquare([x,y]))
			}
		}
	}
}