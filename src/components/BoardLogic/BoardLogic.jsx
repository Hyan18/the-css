export default class BoardLogic {
  constructor (initialGrid, CellLogic) {
    this.cells = initialGrid.map(row => row.map(state => new CellLogic(state)))
    this.generationCount = 0
    this.isRunning = true
    this.activeCells = new Set()
    setNeighbours(this.cells)
  }

  addActiveCell (cell) {
    this.activeCells.add(cell)
    return this.activeCells
  }

  clearInactiveCells () {
    this.activeCells.forEach(cell => {
      if (!cell.isActive()) {
        this.activeCells.delete(cell)
      }
    })
    return this.activeCells
  }

  iterate () {
    this.generationCount++
    this.cells.forEach(row => row.forEach(cell => cell.nextState()))
    this.cells.forEach(row => row.forEach(cell => cell.updateState()))
  }

  cellStates () {
    return this.cells.map(row => row.map(cell => cell.currentState()))
  }

  toggleCellState (row, col) {
    this._findCell(row, col).toggleState()
  }

  // TODO: Don't think we need this function need to check with group (Jamie)
  play (timeout = setTimeout, iterate = this.iterate) {
    if (this.isRunning) {
      iterate()
      timeout(this.play, 100)
    }
  }

  pause () {
    this.isRunning = false
    return this.isRunning
  }

  reset () {
    this.generationCount = 0
    return 0
  }

  getGenerationCount () {
    return this.generationCount
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
