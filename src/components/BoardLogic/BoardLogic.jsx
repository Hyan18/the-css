export default class BoardLogic {
  constructor (initialGrid, CellLogic) {
    this.cells = initialGrid.map(row => row.map(state => new CellLogic(state)))
    this.generationCount = 0
    this.isRunning = true
    setNeighbours(this.cells)
  }

  getGenerationCount () {
    return this.generationCount
  }

  iterate () {
    this.generationCount++
    this.cells.forEach(row => row.forEach(cell => cell.nextState()))
    this.cells.forEach(row => row.forEach(cell => cell.updateState()))
  }

  cellStates () {
    return this.cells.map(row => row.map(cell => cell.currentState()))
  }

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
    return this.generationCount
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
