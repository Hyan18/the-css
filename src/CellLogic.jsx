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
    if (this.neighbours.length === 3) {
      return 1
    } else if (this.state === 1 && this.neighbours.length === 2) { 
      return 1
    } else {
      return 0
    }
  }
}
