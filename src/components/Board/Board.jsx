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

    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    if(event.target.value <= 60 )
    if(event.target.name === 'rows')
        this.setState({rows: parseInt(event.target.value, 10)})
    else
        this.setState({cols: parseInt(event.target.value, 10)})
  }

  changeBoardSize() {
    this.setState( {
      rows: this.state.rows,
      cols: this.state.cols,
      cells: this.boardRerender()
    })
  }

  render = () => {
    let currentState = this.state.cells

    return (
      <div className="board-container">
        <div className="board-div" style={{ width: WIDTH, maxWidth: WIDTH, height: HEIGHT, maxHeight: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}>
          {currentState.map((row, i) => row.map((cell, j) =>
            (<Cell x={j} y={i} state={cell} key={`${j}, ${i}`} onClick={ () => this.handleClick(j, i, cell) }/>)
          ))}
        </div>
        <div className="controls">
          <button className="button" onClick={this.iterate}>Iterate</button>
          <form>
            <label>
              Rows:
              <input type="number" name="rows" placeholder="max 60" onChange={this.handleChange}/>
              Cols:
              <input type="number" name="cols" placeholder="max 60" onChange={this.handleChange}/> 
            </label>
            <button type="button" onClick={this.changeBoardSize}>Update</button>
            </form>
        </div>
      </div>
    )
  }
}
export default Board
