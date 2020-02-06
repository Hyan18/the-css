import React, { Component } from 'react'
import './Board.css';
import Cell from '../Cell/Cell'
import BoardLogic from '../BoardLogic/BoardLogic'

const CELL_SIZE = 60
const WIDTH = 600
const HEIGHT = 600
const ROWS = 10
const COLS = 10

class Board extends Component {
  constructor () {
    super()
    this.state = {
      cells: this.emptyBoard()
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

  render = () => {
    let currentState = this.state.cells

    return (
      <div>
        <div className="board-div" style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}>
          {currentState.map((row, i) => row.map((cell, j) =>
            (<Cell x={j} y={i} state={cell} key={`${j}, ${i}`} onClick={ () => this.handleClick(j, i, cell) }/>)
          ))}
        </div>
        <div className="controls">
            <button className="button" onClick={this.iterate}>Iterate</button>
        </div>
      </div>
    )
  }
}
export default Board
