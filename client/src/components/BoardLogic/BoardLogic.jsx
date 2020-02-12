export default class BoardLogic {
  constructor (initialGrid, CellLogic) {
    this.cells = initialGrid.map(row => row.map(state => new CellLogic(state)))
    this.isRunning = true
    setNeighbours(this.cells)
  }

  iterate () {
    this.cells.forEach(row => row.forEach(cell => cell.nextState()))
    this.cells.forEach(row => row.forEach(cell => cell.updateState()))
  }

  cellStates () {
    return this.cells.map(row => row.map(cell => cell.currentState()))
  }

  toggleCellState (row, col) {
    this._findCell(row, col).toggleState()
  }

  _findCell (row, col) {
    return this.cells[row][col]
  }
}

function setNeighbours (cells) {
  cells.forEach((row, i) => row.forEach((cell, j) => {
    const xLowerBound = (i > 0 ? i - 1 : i)
    const xUpperBound = (i < cells.length - 1 ? i + 1 : i)

    const yLowerBound = (j > 0 ? j - 1 : j)
    const yUpperBound = (j < cells.length - 1 ? j + 1 : j)

    for (let x = xLowerBound; x <= xUpperBound; x++) {
      for (let y = yLowerBound; y <= yUpperBound; y++) {
        if (x !== i || y !== j) {
          cell.addNeighbour(cells[x][y])
        }
      }
    }
  }))
}
