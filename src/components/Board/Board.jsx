import React, { Component } from 'react'
import './Board.css'
import Cell from '../Cell/Cell'
import BoardLogic from '../BoardLogic/BoardLogic'
import CellLogic from '../CellLogic/CellLogic'

const WIDTH = 600
const HEIGHT = 600
const ROWS = 60
const COLS = 60

class Board extends Component {
  constructor () {
    super()
    this.isRunning = true
    this.board = new BoardLogic(this.emptyBoard(), CellLogic)
    this.state = {
      cells: this.board.cellStates(),
      rows: 60,
      cols: 60,
      cellSize: 10
    }

    this.changeBoardSize = this.changeBoardSize.bind(this);
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

  newEmptyBoard() {
    let board = []
    for (let y = 0; y < this.state.rows; y++) {
      board[y] = []
      for (let x = 0; x < this.state.cols; x++) {
        board[y][x] = 0
      }
    }
    this.board = new BoardLogic(board, CellLogic)
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

  changeBoardSize(event) {
    event.preventDefault()

    this.setState( {
      rows: this.refs.size.value,
      cols: this.refs.size.value,
      cellSize: this.state.cellSize,

    }, () => {
      this.setState( {
        cells: this.newEmptyBoard()
      })
    })
  }

  handleClick (x, y) {
    this.board.toggleCellState(y, x)

    this.setState({ cells: this.board.cellStates() })
  }

  render () {
    return (
      <div className="board-container">
        <div className="board-div" style={{ width: WIDTH, maxWidth: WIDTH, height: HEIGHT, maxHeight: HEIGHT}}>
          {this.state.cells.map((row, i) => row.map((cell, j) =>
            (<Cell x={j} y={i} state={cell} cellSize={WIDTH/this.state.cols} key={`${j}, ${i}`} onClick={ () => this.handleClick(j, i) }/>)
          ))}
        </div>
        <div className="controls">
          <button className="iterate-button" onClick={() => this.iterate()}>Iterate</button>
          <button className="play-button" onClick={() => { this.isRunning = true; this.play() } }>Play</button>
          <button className="pause-button" onClick={() => this.pause()}>Pause</button>
          <form onSubmit={this.changeBoardSize}>
            <label>
              Size:
              <input type="number" placeholder="max 60" ref="size" name="rows"/> 
            </label>
            <input type="submit" value="submit" />
            </form>
        </div>
        <text className="generationCounter">
          {this.board.getGenerationCount()}
        </text>
      </div>
    )
  }
}
export default Board
