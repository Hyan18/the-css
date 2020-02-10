import BoardLogic from './BoardLogic'
import CellLogic from '../CellLogic/CellLogic'

describe('BoardLogic test', () => {
  testBoard('empty 1x1 grid', [[0]], [[0]])

  testBoard('alive one by one grid', [[1]], [[0]])

  testBoard('empty 2x2 grid', [[0, 0], [0, 0]], [[0, 0], [0, 0]])

  testBoard('one alive cell in a 2x2', [[1, 0], [0, 0]], [[0, 0], [0, 0]])

  testBoard('4 alive cells in a 2x2', [[1, 1], [1, 1]], [[1, 1], [1, 1]])

  testBoard('3 alive cells in a 2x2', [[1, 1], [1, 0]], [[1, 1], [1, 1]])

  testBoard('2 alive cells in a 2x2', [[1, 1], [0, 0]], [[0, 0], [0, 0]])

  testBoard('empty 3x3', [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]])

  testBoard('overcrowding', [[1, 1, 1], [1, 1, 0], [0, 0, 0]], [[1, 0, 1], [1, 0, 1], [0, 0, 0]])

  testBoard('9 alive cells in 3x3', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], [[1, 0, 1], [0, 0, 0], [1, 0, 1]])

  testBoard('isolating overcrowding',
    [
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0]
    ],
    [
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0]
    ]
  )

  describe('controls', () => {
    let board

    beforeEach(() => {
      board = new BoardLogic([[0, 0], [0, 0]], CellLogic)
    })

    describe('.play', () => {
      it('iterates continuously', () => {
        const mockSetTimeout = jest.fn()
        const mockIterate = jest.fn()
        board.play(mockSetTimeout, mockIterate)
        expect(mockSetTimeout.mock.calls.length).toBe(1)
        expect(mockSetTimeout.mock.calls[0][0]).toBe(board.play)
        expect(mockSetTimeout.mock.calls[0][1]).toBe(100)
        expect(mockIterate.mock.calls.length).toBe(1)
      })
    })

    describe('.pause', () => {
      it('returns false', () => {
        expect(board.pause()).toEqual(false)
      })
    })

    describe('.getGenerationCount', () => {
      it('returns correct generation count', () => {
        board.iterate()
        board.iterate()
        board.iterate()
        board.iterate()
        expect(board.getGenerationCount()).toBe(4)
      })

      it('returns 0 generation count by default', () => {
        expect(board.getGenerationCount()).toBe(0)
      })
    })

    describe('.reset', () => {
      it('returns correct generation count', () => {
        board.iterate()
        board.iterate()
        board.iterate()
        board.iterate()
        expect(board.reset()).toEqual(0)
      })
    })
  })

  describe('toggleCellState', () => {
    it("should toggle a cell's state given a row and col", () => {
      const board = new BoardLogic([[0, 0], [0, 0]], CellLogic)

      board.toggleCellState(1, 1)
      expect(board.cellStates()[1][1]).toEqual(1)
    })
  })

  describe('addActiveCell', () => {
    it('should return array of active cells', () => {
      const board = new BoardLogic([[1, 0], [0, 0]], CellLogic)
      const fakeCell = { name: 'fakeCell1' }

      expect(board.addActiveCell(fakeCell)).toEqual(new Set([fakeCell]))
    })

    it('should add the cell to array of active cells', () => {
      const board = new BoardLogic([[1, 0], [0, 0]], CellLogic)
      const fakeCell1 = { name: 'fakeCell1' }
      const fakeCell2 = { name: 'fakeCell2' }
      board.addActiveCell(fakeCell1)

      expect(board.addActiveCell(fakeCell2)).toEqual(new Set([fakeCell1, fakeCell2]))
    })

    it('should not duplicate any cell in the array', () => {
      const board = new BoardLogic([[1, 0], [0, 0]], CellLogic)
      const fakeCell1 = { name: 'fakeCell1' }
      board.addActiveCell(fakeCell1)

      expect(board.addActiveCell(fakeCell1)).toEqual(new Set([fakeCell1]))
    })
  })

  describe('clearInactiveCells', () => {
    it('should return an array of active cells', () => {
      const fakeCell1 = { name: 'fakeCell1', isActive: () => true }
      const fakeCell2 = { name: 'fakeCell2', isActive: () => false }
      const board = new BoardLogic([[1, 0], [0, 0]], CellLogic)

      board.addActiveCell(fakeCell1)
      board.addActiveCell(fakeCell2)

      expect(board.clearInactiveCells()).toEqual(new Set([fakeCell1]))
    })
  })
})

function testBoard (description, initialGrid, expectedGrid) {
  test(description, () => {
    const board = new BoardLogic(initialGrid, CellLogic)
    board.iterate()
    expect(board.cellStates()).toEqual(expectedGrid)
  })
}
