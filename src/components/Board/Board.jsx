import React, { Component } from 'react'
import './Board.css'
import Cell from '../Cell/Cell'
import BoardLogic from '../BoardLogic/BoardLogic'
import CellLogic from '../CellLogic/CellLogic'

const CELL_SIZE = 60
const WIDTH = 600
const HEIGHT = 600
const ROWS = 10
const COLS = 10

class Board extends Component {
  constructor () {
    super()
    this.boardLogic = new BoardLogic(this.emptyBoard(), CellLogic)
    this.state = {
      cells: this.boardLogic.cellStates()
    }
  }

  emptyBoard () {
    const board = []
    for (let y = 0; y < ROWS; y++) {
      board[y] = []
      for (let x = 0; x < COLS; x++) {
        board[y][x] = 0
      }
    }
    return board
  }

  iterate () {
    const board = this.boardLogic
    board.iterate()
    this.setState( { cells: board.cellStates() })
  }

  handleClick (x, y, state) {
    const cells = this.state.cells.slice()

    cells[y][x] = (state + 1) % 2

    this.setState({ cells: cells })
  }

  render () {
    return (
      <div>
        <div className="board-div" style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}>
          {this.state.cells.map((row, i) => row.map((cell, j) =>
            (<Cell x={j} y={i} state={cell} key={`${j}, ${i}`} onClick={ () => this.handleClick(j, i, cell) }/>)
          ))}
        </div>
        <div className="controls">
          <button className="button" onClick={() => this.iterate()}>Iterate</button>
        </div>
      </div>
    )
  }
}
export default Board
