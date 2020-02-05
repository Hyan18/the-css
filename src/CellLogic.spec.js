import CellLogic from './CellLogic'

describe('CellLogic', () => {

  let deadCell
  let liveCell
  let neighbour1

  beforeEach(() => {
    deadCell = new CellLogic(0)
    liveCell = new CellLogic(1)
    neighbour1 = new CellLogic(1)
  })

  it('can return current state when initialized with integer', () => {
    expect(deadCell.currentState()).toEqual(0)
  })

  describe("Add neighbour", () => {
    it("Should return an array of the first neighbour", () => {
      expect(deadCell.addNeighbour(neighbour1)).toEqual([neighbour1])
    })

    it("Should return an array of two neighbours", () => {
      const neighbour2 = new CellLogic(0)
      deadCell.addNeighbour(neighbour1)
      expect(deadCell.addNeighbour(neighbour2)).toEqual([neighbour1, neighbour2])
    })
  })

  describe('nextState', () => {
    it('should return the 0 if it has no neighbours', () => {
      expect(deadCell.nextState()).toEqual(0);
    })

    it('should return 1 when there are enough neighbours to come alive', () => {
      for(let i = 0; i < 3; i++) {
        deadCell.addNeighbour(neighbour1)
      }

      expect(deadCell.nextState()).toEqual(1)
    })

    it('should return 0 when there are two neighbours', () => {
      for(let i = 0; i < 2; i++) {
        deadCell.addNeighbour(neighbour1)
      }

      expect(deadCell.nextState()).toEqual(0)
    })

    it('should return 0 if there are too many live neighbours', () => {
      for(let i = 0; i < 4; i++) {
        deadCell.addNeighbour(neighbour1)
      }

      expect(deadCell.nextState()).toEqual(0)
    })

    it('live cell should return 1 if there are two live neighbours', () => {
      for(let i = 0; i < 2; i++) {
        liveCell.addNeighbour(neighbour1)
      }

      expect(liveCell.nextState()).toEqual(1)
    })

    it('live cell should return 0 if there are 4 or more live neighbours', () => {
      for(let i = 0; i < 4; i++) {
        liveCell.addNeighbour(neighbour1)
      }

      expect(liveCell.nextState()).toEqual(0)
    })
  })
})
