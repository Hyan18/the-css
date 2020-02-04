import BoardLogic from './boardLogic';

describe('BoardLogic test', () => {

  testBoard('empty 1x1 grid', [[0]], [[0]]);

  testBoard('alive one by one grid', [[1]], [[0]]);

  testBoard('empty 2x2 grid', [[0,0],[0,0]], [[0,0],[0,0]]);

  testBoard('one alive cell in a 2x2', [[1,0],[0,0]], [[0,0],[0,0]]);

  testBoard('4 alive cells in a 2x2', [[1,1],[1,1]], [[1,1],[1,1]]);

  function testBoard(description, initialGrid, expectedGrid) {
    test(description, () => {
      const board = new BoardLogic(initialGrid);
      board.iterate();
      expect(board.cellStates()).toEqual(expectedGrid);
    });
  };

});
