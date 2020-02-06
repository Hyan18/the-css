export default class BoardLogic {

  constructor(initialGrid) {
    this.grid = initialGrid;
    this.isRunning = true
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

  // play(timeout = new setInterval(function() {play()}, 300)) {
  //   this.iterate()
  //   setInterval(play)
  // }

  play(timeout = setTimeout, iterate = this.iterate){
    if(this.isRunning){
      iterate()
      timeout(this.play, 100)
    }
  }

  stop(){
    return this.isRunning = false
  }

  cellStates() {
    return this.grid;
  };
}
