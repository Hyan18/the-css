import React, { Component } from 'react'
import './Cell.css'
import PropTypes from 'prop-types'


export default class Cell extends Component {

  render = () => {
    const { x, y, state, onClick, cellSize } = this.props;

    return (
      <div className={`Cell${state}`} id={`cell_${x}_${y}`} onClick={onClick} style={{
        left: `${cellSize * x + 1}px`,
        top: `${cellSize * y + 1}px`,
        width: `${cellSize - 1}px`,
        height: `${cellSize - 1}px`,
      }}
      />
    )
  }
}

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  state: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}
