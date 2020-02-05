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
    
    if (sum === 3) return 1 
    if (this.state === 1 && sum === 2) return 1
    return 0
  }
}

function sumNeighbourStates (neighbours) {
  return neighbours.reduce((acc, neighbour)=> {
    return acc + neighbour.state
  }, 0)
}
