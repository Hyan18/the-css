export default class CellLogic {
  constructor (initialState) {
    this.state = initialState
    this.neighbours = []
  }

  currentState () {
    return this.state
  }

  addNeighbour (neighbour) {
    this.neighbours.push(neighbour)
    return this.neighbours
  }

  nextState () {
    const sum = sumNeighbourStates(this.neighbours)

    if (sum === 3) {
      this.futureState = 1
      return this.futureState
    }
    if (this.state === 1 && sum === 2) {
      this.futureState = 1
      return this.futureState
    }
    this.futureState = 0
    return this.futureState
  }

  updateState () {
    this.state = this.futureState
    return this.state
  }
}

function sumNeighbourStates (neighbours) {
  return neighbours.reduce((acc, neighbour) => {
    return acc + neighbour.state
  }, 0)
}
