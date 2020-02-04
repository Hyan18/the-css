export default class BoardLogic {

  constructor(initialGrid, Cell) {
    this.grid = initialGrid.map(row => row.map(state => new Cell(state)))
    this.grid.forEach((row, i) => row.forEach((cell, j) => {
      const xLowerBound = (i > 0 ? i - 1 : i)
      const xUpperBound = (i < this.grid.length-1 ? i + 1 : i)

      const yLowerBound = (j > 0 ? j - 1 : j)
      const yUpperBound = (j < this.grid.length-1 ? j + 1 : j)

      let neighbours = []
      for (let x = xLowerBound; x <= xUpperBound; x++) {
        for (let y = yLowerBound; y <= yUpperBound; y++) {
          if (x !== i || y !== j) {
            neighbours.push(this.grid[x][y])
          }
        }
      }
      cell.setNeighbours(neighbours)
    }))
  }

  iterate() {
    this.grid.forEach(row => row.forEach(cell => cell.setNextState()))
    this.grid.forEach(row => row.forEach(cell => cell.updateState()))
  }

  cellStates() {
    return this.grid.map(row => row.map(cell => cell.currentState()))
  }
}
