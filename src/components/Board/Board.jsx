import React, { Component } from 'react'
import './Board.css';

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

    return board;
  }

  render = () => {
    let currentState = this.state.cells

    return (
      <div className="board-div">
        {currentState.map((row, i) => row.map((cell, j) =>
          (<div className="Cell0"/>)
        ))}
      </div>
    )
  }
}

export default Board
