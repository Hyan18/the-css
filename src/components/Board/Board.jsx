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
    this.isRunning = true
    this.board = new BoardLogic(this.emptyBoard(), CellLogic)
    this.state = {
      cells: this.board.cellStates()
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
    this.board.iterate()
    this.setState({ cells: this.board.cellStates() })
  }

  play (timeout = setTimeout, iterateFunc) {
    if (this.isRunning) {
      if (iterateFunc) {
        iterateFunc()
      } else {
        this.iterate()
      }
      timeout(() => this.play(), 100)
    }
  }

  pause () {
    this.isRunning = false
  }

  handleClick (x, y) {
    this.board.toggleCellState(y, x)

    this.setState({ cells: this.board.cellStates() })
  }

  render () {
    return (
      <div className="board-container">
        <div className="board-div" style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}>
          {this.state.cells.map((row, i) => row.map((cell, j) =>
            (<Cell x={j} y={i} state={cell} key={`${j}, ${i}`} onClick={ () => this.handleClick(j, i) }/>)
          ))}
        </div>
        <div className="controls">
          <button className="iterate-button" onClick={() => this.iterate()}>Iterate</button>
          <button className="play-button" onClick={() => { this.isRunning = true; this.play() } }>Play</button>
          <button className="pause-button" onClick={() => this.pause()}>Pause</button>
        </div>
        <text className="generationCounter">
          {this.board.getGenerationCount()}
        </text>
      </div>
    )
  }
}
export default Board
