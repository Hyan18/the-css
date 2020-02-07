import CellLogic from './CellLogic'

describe('CellLogic', () => {
  let deadCell
  let liveCell
  let liveNeighbour
  let deadNeighbour

  beforeEach(() => {
    deadCell = new CellLogic(0)
    liveCell = new CellLogic(1)
    liveNeighbour = new CellLogic(1)
    deadNeighbour = new CellLogic(0)
  })

  it('can return current state when initialized with integer', () => {
    expect(deadCell.currentState()).toEqual(0)
  })

  describe('Add neighbour', () => {
    it('Should return an array of the first neighbour', () => {
      expect(deadCell.addNeighbour(liveNeighbour)).toEqual([liveNeighbour])
    })

    it('Should return an array of two neighbours', () => {
      deadCell.addNeighbour(liveNeighbour)
      expect(deadCell.addNeighbour(deadNeighbour)).toEqual([liveNeighbour, deadNeighbour])
    })
  })

  describe('nextState', () => {
    describe('dead cell', () => {
      it('should return 0 if it has no neighbours', () => {
        expect(deadCell.nextState()).toEqual(0)
      })

      it('should return 0 when there are two neighbours', () => {
        for (let i = 0; i < 2; i++) {
          deadCell.addNeighbour(liveNeighbour)
        }

        expect(deadCell.nextState()).toEqual(0)
      })

      it('should return 1 when there are enough neighbours to come alive', () => {
        for (let i = 0; i < 3; i++) {
          deadCell.addNeighbour(liveNeighbour)
        }

        expect(deadCell.nextState()).toEqual(1)
      })

      it('should return 0 if there are too many live neighbours', () => {
        for (let i = 0; i < 4; i++) {
          deadCell.addNeighbour(liveNeighbour)
        }

        expect(deadCell.nextState()).toEqual(0)
      })

      it('should return 0 if too few neighbours are alive', () => {
        deadCell.addNeighbour(liveNeighbour)
        deadCell.addNeighbour(liveNeighbour)
        deadCell.addNeighbour(deadNeighbour)

        expect(deadCell.nextState()).toEqual(0)
      })
    })

    describe('live cell', () => {
      it('live cell should return 1 if there are two live neighbours', () => {
        for (let i = 0; i < 2; i++) {
          liveCell.addNeighbour(liveNeighbour)
        }

        expect(liveCell.nextState()).toEqual(1)
      })

      it('live cell should return 0 if there are 4 or more live neighbours', () => {
        for (let i = 0; i < 4; i++) {
          liveCell.addNeighbour(liveNeighbour)
        }

        expect(liveCell.nextState()).toEqual(0)
      })
    })
  })

  describe('updateState', () => {
    it('should set the current state to the future state', () => {
      for (let i = 0; i < 4; i++) {
        liveCell.addNeighbour(liveNeighbour)
      }

      const beforeState = liveCell.currentState()
      const nextState = liveCell.nextState()

      expect(liveCell.currentState()).toEqual(beforeState)
      expect(liveCell.updateState()).toEqual(nextState)
      expect(liveCell.currentState()).toEqual(nextState)
    })
  })

  describe('toggleState', () => {
    it('should turn a dead cell alive', () => {
      expect(deadCell.toggleState()).toEqual(1)
      expect(deadCell.currentState()).toEqual(1)
    })

    it('should turn a live cell dead', () => {
      expect(liveCell.toggleState()).toEqual(0)
      expect(liveCell.currentState()).toEqual(0)
    })
  })
})
