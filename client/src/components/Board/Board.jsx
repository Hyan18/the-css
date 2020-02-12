import React, { Component } from 'react'
import './Board.css'
import Cell from '../Cell/Cell'
import BoardLogic from '../BoardLogic/BoardLogic'
import CellLogic from '../CellLogic/CellLogic'
import { PRESETS } from './Presets'

const WIDTH = 600
const HEIGHT = 600
const ROWS = 10
const COLS = 10

class Board extends Component {
  constructor () {
    super()
    this.generationCount = 0
    this.generationLimit = Infinity
    this.clickLimit = Infinity
    this.isPlaying = false
    this.sizeRef = React.createRef()
    this.limitRef = React.createRef()
    this.clickLimitRef = React.createRef()
    this.board = new BoardLogic(this.newEmptyBoard(), CellLogic)
    this.state = {
      preset: 'Default',
      cells: this.board.cellStates(),
      rows: ROWS,
      cols: COLS,
      generationCount: 0,
      clickCount: 0
    }

    this.changeBoardSize = this.changeBoardSize.bind(this)
    this.changeLimit = this.changeLimit.bind(this)
    this.changeClickLimit = this.changeClickLimit.bind(this)
    this.handleChangeMap = this.handleChangeMap.bind(this)
  }

  clickToSetLimit () {
    this.limitRef.current.focus()
  }

  clickToSetClickLimit () {
    this.clickLimitRef.current.focus()
  }

  clickToResize () {
    this.sizeRef.current.focus()
  }

  changeLimit (event) {
    event.preventDefault()

    this.generationLimit = this.limitRef.current.value
    this.pause()
  }

  changeClickLimit (event) {
    event.preventDefault()

    this.clickLimit = this.clickLimitRef.current.value
  }

  newEmptyBoard (rows = ROWS, cols = COLS) {
    const board = []
    for (let y = 0; y < rows; y++) {
      board[y] = []
      for (let x = 0; x < cols; x++) {
        board[y][x] = 0
      }
    }
    return board
  }

  iterate () {
    if ((this.generationCount < this.generationLimit)) {
      this.board.iterate()
      this.setState({
        generationCount: this.generationCount + 1,
        cells: this.board.cellStates()
      })
      this.generationCount++
    }
  }

  play () {
    if (this.isPlaying) {
      this.iterate()
      setTimeout(() => {
        this.play()
      }, 100)
    }
  }

  _checkIfPlaying () {
    if (this.isPlaying === true) {
      return
    }
    this.isPlaying = true
    this.play()
  }

  pause () {
    this.isPlaying = false
  }

  reset () {
    this.pause()
    this.board = new BoardLogic(this.newEmptyBoard(this.state.rows, this.state.cols), CellLogic)
    this.clickLimit = Infinity
    this.generationCount = 0
    this.setState({
      cells: this.board.cellStates(),
      generationCount: 0,
      clickCount: 0
    })
  }

  changeBoardSize (event) {
    event.preventDefault()
    this.reset()
    this.setState({
      rows: this.sizeRef.current.value,
      cols: this.sizeRef.current.value
    }, () => {
      const cells = this.newEmptyBoard(this.state.rows, this.state.cols)
      this.board = new BoardLogic(cells, CellLogic)
      this.setState({
        cells: cells
      })
    })
  }

  handleClick (x, y) {
    if (this.state.clickCount !== this.clickLimit) {
      this.board.toggleCellState(y, x)

      this.setState({
        clickCount: this.state.clickCount + 1,
        cells: this.board.cellStates()
      })
    }
  }

  handleChangeMap (event) {
    this.setState({ preset: event.target.value })
  }

  loadMap () {
    const presetName = this.state.preset
    const currentPreset = PRESETS.find(preset => preset.name === presetName)
    const presetData = currentPreset.data
    this.board = new BoardLogic(presetData, CellLogic)
    this.setState({
      rows: presetData.length,
      cols: presetData.length,
      cells: presetData
    })
  }

  render () {
    return (
      <div className="board-container">
        <div className="board-div" style={{ width: WIDTH, maxWidth: WIDTH, height: HEIGHT, maxHeight: HEIGHT }}>
          {this.state.cells.map((row, i) => row.map((cell, j) =>
            (<Cell x={j} y={i} state={cell} cellSize={WIDTH / this.state.cols} key={`${j}, ${i}`} onClick={ () => this.handleClick(j, i) }/>)
          ))}
        </div>
        <div className="controls">
          <button className="iterate-button" onClick={() => this.iterate()}>Iterate</button>
          <button className="play-button" onClick={() => { this._checkIfPlaying() } }>Play</button>
          <button className="pause-button" onClick={() => this.pause()}>Pause</button>
          <button className="reset-button" onClick={() => this.reset()}>Reset</button>
          <form onSubmit={this.changeBoardSize}>
            <label>
              Size:
              <input type="number" placeholder="max 60" ref={this.sizeRef} name="size"/>
            </label>
            <input type="submit" value="submit" onClick={this.clickToResize.bind(this)}/>
          </form>
          <form onSubmit={this.changeLimit}>
            <label>
              Limit:
              <input type="number" name="limit" ref={this.limitRef}/>
            </label>
            <input type="submit" value="submit" onClick={this.clickToSetLimit.bind(this)}/>
          </form>
          <form onSubmit={this.changeClickLimit}>
            <label>
              Click limit:
              <input type="number" name="clickLimit" ref={this.clickLimitRef}/>
            </label>
            <input type="submit" value="submit" onClick={this.clickToSetClickLimit.bind(this)}/>
          </form>
          <select className="map-select" onChange={this.handleChangeMap}>
            {PRESETS.map((preset, i) =>
              (<option key={i} value={preset.name}>{preset.name}</option>)
            )}
          </select>
          <button className="map-submit-button" onClick={() => this.loadMap()}>Submit</button>
        </div>
        <div className="generationCounter">
          Generations: {this.state.generationCount}
        </div>
        <div className="clickCounter">
          Click Count: {this.state.clickCount}
        </div>
      </div>
    )
  }
}
export default Board
