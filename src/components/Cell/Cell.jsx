import React, { Component } from 'react'
import './Cell.css';

const CELL_SIZE = 200;

class Cell extends Component {

  render = () => {
    const { x, y, state } = this.props;

    return (
        <div className={`Cell${state}`} style={{
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }} />
    );
  }
}

export default Cell
