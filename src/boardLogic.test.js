import BoardLogic from './boardLogic';

describe('BoardLogic test', () => {

  test('empty one by one grid', () => {
    const board = new BoardLogic([[0]]);
    board.iterate();
    expect(board.cellStates()).toEqual([[0]]);
  });

});
