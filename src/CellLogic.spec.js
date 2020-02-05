import CellLogic from './CellLogic'

describe('CellLogic', () => {
  it('can return current state when initialized with integer', () => {
    const cell = new CellLogic(5)
    expect(cell.currentState()).toEqual(5)
  })
})