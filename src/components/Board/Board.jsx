import React, { Component } from 'react'
import './Board.css';
import Cell from '../Cell/Cell'
import BoardLogic from '../BoardLogic/BoardLogic'

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
      cols: 60,
      cellSize: 10
    }

    this.changeBoardSize = this.changeBoardSize.bind(this);
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

  boardRerender() {
    let board = []
    for (let y = 0; y < this.state.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.state.cols; x++) {
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

  // this.setState({count:42}, () => {
  //   console.log(this.state.count)
  // })

  changeBoardSize(event) {
    event.preventDefault()

    this.setState( {
      rows: this.refs.size.value,
      cols: this.refs.size.value,
      cellSize: this.state.cellSize,
    }, () => {
      this.setState( {
        cells: this.boardRerender()
      })
    })
  }

  render = () => {
    let currentState = this.state.cells

    return (
      <div className="board-container">
        <div className="board-div" style={{ width: WIDTH, maxWidth: WIDTH, height: HEIGHT, maxHeight: HEIGHT}}>
          {currentState.map((row, i) => row.map((cell, j) =>
            (<Cell x={j} y={i} state={cell} cellSize={WIDTH/this.state.cols} key={`${j}, ${i}`} onClick={ () => this.handleClick(j, i, cell) }/>)
          ))}
        </div>
        <div className="controls">
          <button className="button" onClick={this.iterate}>Iterate</button>
          <form onSubmit={this.changeBoardSize}>
            <label>
              Size:
              <input type="number" placeholder="max 60" ref="size" name="rows"/> 
            </label>
            <input type="submit" value="submit" />
            </form>
        </div>
      </div>
    )
  }
}
export default Board
