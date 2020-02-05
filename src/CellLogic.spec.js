import CellLogic from './CellLogic'

describe('CellLogic', () => {
  it('can return current state when initialized with integer', () => {
    const cell = new CellLogic(0)
    expect(cell.currentState()).toEqual(0)
  })

  describe("Add neighbour", () => {
    it("Should return an array of the first neighbour", () => {
      const cell = new CellLogic(1)
      const neighbour = new CellLogic(0)
      expect(cell.addNeighbour(neighbour)).toEqual([neighbour])
    })

    it("Should return an array of two neighbours", () => {
      const cell = new CellLogic(1)
      const neighbour1 = new CellLogic(1)
      const neighbour2 = new CellLogic(0)
      cell.addNeighbour(neighbour1)
      expect(cell.addNeighbour(neighbour2)).toEqual([neighbour1, neighbour2])
    })
  })
})