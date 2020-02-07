import React, { Component } from 'react'
import './Cell.css'
import PropTypes from 'prop-types'

const CELL_SIZE = 60

export default class Cell extends Component {
  render () {
    const { x, y, state, onClick } = this.props

    return (
      <div className={`Cell${state}`} id={`cell_${x}_${y}`} onClick={onClick} style={{
        left: `${CELL_SIZE * x + 1}px`,
        top: `${CELL_SIZE * y + 1}px`,
        width: `${CELL_SIZE - 1}px`,
        height: `${CELL_SIZE - 1}px`
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
