import React, { Component } from 'react'
import './Board.css';

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Board extends Component {

  render = () =>{
    return (
      <div className="board-div" style={{ width: WIDTH, height: HEIGHT }}>>

      </div>
    )
  }
}

export default Board
