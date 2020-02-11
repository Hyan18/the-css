import React, { Component } from 'react'
import './Board.css'
import Cell from '../Cell/Cell'
import BoardLogic from '../BoardLogic/BoardLogic'
import CellLogic from '../CellLogic/CellLogic'

const WIDTH = 600
const HEIGHT = 600
const ROWS = 10
const COLS = 10

class Board extends Component {
  constructor () {
    super()
    this.generationCount = 0
    this.generationLimit = Infinity
    this.isPlaying = false
    this.inputRef = React.createRef()
    this.board = new BoardLogic(this.newEmptyBoard(), CellLogic)
    this.state = {
      cells: this.board.cellStates(),
      rows: ROWS,
      cols: COLS,
      cellSize: 60,
      generationCount: 0
    }

    this.changeBoardSize = this.changeBoardSize.bind(this)
  }

  clickToResize () {
    this.inputRef.current.focus()
  }

  newEmptyBoard (rows = ROWS, cols = COLS) {
    const board = []
    for (let y = 0; y < rows; y++) {
      board[y] = []
      for (let x = 0; x < cols; x++) {
        board[y][x] = 0
      }
    }
    return board
  }

  iterate () {
    this.board.iterate()
    this.setState({
      generationCount: this.generationCount + 1,
      cells: this.board.cellStates()
    })
    this.generationCount++
  }

  play () {
    if (this.isPlaying && (this.generationCount < this.generationLimit)) {
      this.iterate()
      setTimeout(() => {
        this.play()
      }, 100)
    }
  }

  _checkIfPlaying () {
    if (this.isPlaying === true) {
      return
    }
    this.isPlaying = true
    this.play()
  }

  pause () {
    this.isPlaying = false
  }

  reset () {
    this.pause()
    this.board = new BoardLogic(this.newEmptyBoard(this.state.rows, this.state.cols), CellLogic)
    this.generationCount = 0
    this.setState({
      cells: this.board.cellStates(),
      generationCount: 0
    })
  }

  changeBoardSize (event) {
    event.preventDefault()
    this.reset()
    this.setState({
      rows: this.inputRef.current.value,
      cols: this.inputRef.current.value,
      cellSize: this.state.cellSize

    }, () => {
      const cells = this.newEmptyBoard(this.state.rows, this.state.cols)
      this.board = new BoardLogic(cells, CellLogic)
      this.setState({
        cells: cells
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
        <div className="board-div" style={{ width: WIDTH, maxWidth: WIDTH, height: HEIGHT, maxHeight: HEIGHT }}>
          {this.state.cells.map((row, i) => row.map((cell, j) =>
            (<Cell x={j} y={i} state={cell} cellSize={WIDTH / this.state.cols} key={`${j}, ${i}`} onClick={ () => this.handleClick(j, i) }/>)
          ))}
        </div>
        <div className="controls">
          <button className="iterate-button" onClick={() => this.iterate()}>Iterate</button>
          <button className="play-button" onClick={() => { this._checkIfPlaying() } }>Play</button>
          <button className="pause-button" onClick={() => this.pause()}>Pause</button>
          <button className="reset-button" onClick={() => this.reset()}>Reset</button>
          <form onSubmit={this.changeBoardSize}>
            <label>
              Size:
              <input type="number" placeholder="max 60" ref={this.inputRef} name="size"/>
            </label>
            <input type="submit" value="submit" onClick={this.clickToResize.bind(this)}/>
          </form>
        </div>
        <div className="generationCounter">
          {this.state.generationCount}
        </div>
      </div>
    )
  }
}
export default Board
