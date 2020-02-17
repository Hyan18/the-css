import React, { Fragment } from 'react'
import './Text.css'

export const Text = () =>
  <Fragment>
    <div className="description-div">
      <p className="title">Cellular Automaton</p>
      <p className="text">
        Is a collection of cells arranged in a grid.
        Each cell changes state according to
        a defined set of rules:
        <br></br><br></br>
        1. Any live cell with two or three neighbors survives.
        <br></br><br></br>
        2. Any dead cell with three live neighbors becomes a live cell
        <br></br><br></br>
        3. All other live cells die in the next generation. Similarly, all other dead cells stay dead
        <br></br>
      </p>
    </div>
  </Fragment>
