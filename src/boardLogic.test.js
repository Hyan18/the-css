import BoardLogic from './boardLogic'

describe('BoardLogic', () => {

  const myCell = { setNeighbours: jest.fn(),
                   setNextState: jest.fn(),
                   updateState: jest.fn(),
                   currentState: jest.fn(() => 0) }
  const myCellConstructor = jest.fn(x => myCell)

  afterEach(() => {
    myCell.currentState.mockClear()
    myCell.setNeighbours.mockClear()
    myCell.setNextState.mockClear()
    myCell.updateState.mockClear()
    myCellConstructor.mockClear()
  })

  describe('new BoardLogic', () => {

    test('should convert initial states to cells', () => {
      const boardLogic = new BoardLogic([[0]], myCellConstructor)
      expect(myCellConstructor.mock.calls.length).toBe(1)
      expect(myCellConstructor.mock.calls[0][0]).toBe(0)

      myCellConstructor.mockClear()
      const boardLogic2 = new BoardLogic([[1]], myCellConstructor)
      expect(myCellConstructor.mock.calls[0][0]).toBe(1)

      myCellConstructor.mockClear()
      const boardLogic3 = new BoardLogic([[0,0],[1,1]], myCellConstructor)
      expect(myCellConstructor.mock.instances.length).toBe(4)

    })

    test('should set neighbours', () => {
      const boardLogic = new BoardLogic([[0]], myCellConstructor)
      expect(myCell.setNeighbours.mock.calls.length).toBe(1)
    })

    test('should set neighbours 4 times', () => {
      const boardLogic = new BoardLogic([[1,0],[1,0]], myCellConstructor)
      expect(myCell.setNeighbours.mock.calls.length).toBe(4)
      myCell.setNeighbours.mock.calls.forEach(args => {
        expect(args[0].length).toBe(3)
      })
    })

  })

  describe('.iterate', () => {

    test('should call setNextState for each cell', () => {
      const boardLogic = new BoardLogic([[1,0],[1,0]], myCellConstructor)
      boardLogic.iterate()
      expect(myCell.setNextState.mock.calls.length).toBe(4)
    })

    test('should call updateState for each cell', () => {
      const boardLogic = new BoardLogic([[1,0],[1,0]], myCellConstructor)
      boardLogic.iterate()
      expect(myCell.updateState.mock.calls.length).toBe(4)
    })

  })

  describe('.cellStates', () => {

    test('call current state on each cell', () => {
      const boardLogic = new BoardLogic([[1,0],[1,0]], myCellConstructor)
      boardLogic.cellStates();
      expect(myCell.currentState.mock.calls.length).toBe(4)
    })

    test('should return current states in a 2D array', () => {
      const boardLogic = new BoardLogic([[1,0],[1,0]], myCellConstructor)
      expect(boardLogic.cellStates()).toEqual([[0,0],[0,0]])
    })

  })

})
