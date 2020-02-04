import React, { Component } from 'react'
import './Board.css';
import BoardLogic from '../BoardLogic/BoardLogic'
import Cell from '../Cell/Cell'

const CELL_SIZE = 200;
const WIDTH = 600;
const HEIGHT = 600;

class Board extends Component {
  constructor () {
    super()
    this.boardLogic = new BoardLogic ([[0,1,0],[0,1,0],[0,1,0]])
  }
  
  render = () => {
    const currentState = this.boardLogic.cellStates()

    return (

      <div className="board-div" style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}>
        {currentState.map((row, i) => row.map((cell, j) => 
        (<Cell x={j} y={i} state={cell}/>)
        ))}
      </div>
    )
  }
}

export default Board
