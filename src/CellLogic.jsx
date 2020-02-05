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

}