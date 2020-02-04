export default class BoardLogic {

  constructor(initialGrid) {
    this.grid = initialGrid;
  };

  iterate() {
    if(this.grid.flat().reduce((acc, cell) => acc + cell) != 4)
      this.grid = this.grid.map(row => row.map(item => 0));
  };

  cellStates() {
    return this.grid;
  };
}
