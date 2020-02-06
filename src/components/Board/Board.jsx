import React, { Component } from 'react'
import './Board.css';
import Cell from '../Cell/Cell'
import BoardLogic from '../BoardLogic/BoardLogic'

const CELL_SIZE = 10
const WIDTH = 600
const HEIGHT = 600
const ROWS = 60
const COLS = 60

class Board extends Component {
  constructor () {
    super()
    this.state = {
      cells: this.emptyBoard(),
      rows: 60,
      cols: 60
    }
  }

  emptyBoard() {
    let board = []
    for (let y = 0; y < ROWS; y++) {
      board[y] = [];
      for (let x = 0; x < COLS; x++) {
          board[y][x] = 0;
      }
    }
    return board
  }

  iterate = () => {
    let board = new BoardLogic(this.state.cells)
    board.iterate()
    this.setState({ cells: board.cellStates() })
  }

  handleClick(x, y, state) {
    let cells = this.state.cells.slice()

    cells[y][x] = (state + 1) % 2

    this.setState( { cells: cells } )
  }

  changeBoardSize = (event) => {
    this.setState({ rows: 2})
    this.setState({ cols: 3})
  }

  render = () => {
    let currentState = this.state.cells

    return (
      <div class="board-container">
        <div className="board-div" style={{ width: WIDTH, maxWidth: WIDTH, height: HEIGHT, maxHeight: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}>
          {currentState.map((row, i) => row.map((cell, j) =>
            (<Cell x={j} y={i} state={cell} key={`${j}, ${i}`} onClick={ () => this.handleClick(j, i, cell) }/>)
          ))}
        </div>
        <div className="controls">
          <button className="button" onClick={this.iterate}>Iterate</button>  
          <form>
              <input type="text" ref="rows" name="rows" />
              <input type="text" ref="cols" name="cols" />
              <button type="button" onClick={this.changeBoardSize}>Update</button>
            </form>
        </div>
      </div>
    )
  }
}
export default Board
