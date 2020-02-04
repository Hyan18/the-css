export default class BoardLogic {

  constructor(initialGrid) {
    this.grid = initialGrid;
  };

  iterate() {
    // set all cells to zero
    this.grid = this.grid.map(row => row.map(item => 0));
  };

  cellStates() {
    return this.grid;
  };
}
