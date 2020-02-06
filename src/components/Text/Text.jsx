import React, { Fragment } from 'react'
import logo from './logo.png'
import './Text.css'

export const Text = () => <Fragment>
  <img src={logo} alt="Logo" width="400" height="200" />
  <br></br><br></br><br></br>
  Is a collection of cells arranged in a grid,<br></br>
  such that each cell changes state as a function of time according to
  a defined set of rules that includes the states of neighboring cells.
</Fragment>
