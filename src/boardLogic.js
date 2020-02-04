export default class BoardLogic {

  constructor(initialGrid) {
    this.grid = initialGrid;
  };

  iterate() {
    this.grid = this.grid.map((row, i) => row.map((cell, j) => {
      const xLowerBound = (i > 0 ? i - 1 : i);
      const xUpperBound = (i < this.grid.length-1 ? i + 1 : i);

      const yLowerBound = (j > 0 ? j - 1 : j);
      const yUpperBound = (j < this.grid.length-1 ? j + 1 : j);

      let sum = 0;
      for (let x = xLowerBound; x <= xUpperBound; x++) {
        for (let y = yLowerBound; y <= yUpperBound; y++) {
          if (x !== i || y !== j) {
            sum += this.grid[x][y];
          }
        }
      }
      if (sum === 3) return 1;
      if (sum === 2 && cell === 1) return 1;
      return 0;
    }));
  };

  cellStates() {
    return this.grid;
  };
}
