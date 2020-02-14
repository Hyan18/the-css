import React, { Component } from 'react'
import './Board.css'
import Cell from '../Cell/Cell'
import Controls from '../Controls/Controls'
import MapList from '../MapList/MapList'
import BoardLogic from '../BoardLogic/BoardLogic'
import CellLogic from '../CellLogic/CellLogic'
import axios from 'axios'

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
      presets: [],
      cells: this.board.cellStates(),
      rows: ROWS,
      cols: COLS,
      generationCount: 0,
      generationLimit: 'No Limit',
      clickCount: 0,
      clickLimit: Infinity,
      deathEfficiency: 0
    }

    this.startPlaying = this.startPlaying.bind(this)
    this.iterate = this.iterate.bind(this)
    this.pause = this.pause.bind(this)
    this.reset = this.reset.bind(this)
    this.setUnlimited = this.setUnlimited.bind(this)
    this.saveBoard = this.saveBoard.bind(this)
    this.changeBoardSize = this.changeBoardSize.bind(this)
    this.changeGenerationLimit = this.changeGenerationLimit.bind(this)
    this.changeClickLimit = this.changeClickLimit.bind(this)
    this.loadMap = this.loadMap.bind(this)
  }

  changeGenerationLimit (newLimit) {
    this.generationLimit = newLimit
    this.setState({ generationLimit: this.generationLimit })
    this.pause()
  }

  setUnlimited () {
    this.generationLimit = Infinity
    this.setState({
      generationLimit: 'No limit',
      clickLimit: Infinity
    })
  }

  changeClickLimit (newLimit) {
    this.setState({
      clickLimit: newLimit
    })
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
      this._iterate()
    }
  }

  _iterate () {
    this.board.iterate()

    if (!this.deathReached) {
      this.setState({
        generationCount: ++this.generationCount,
        cells: this.board.cellStates(),
        deathEfficiency: this.generationCount * this.state.clickCount
      })
      if (this.countLiveCells() === 0) { this.deathReached = true }
    } else {
      this.setState({
        generationCount: ++this.generationCount,
        cells: this.board.cellStates()
      })
    }
  }

  play () {
    if (this.isPlaying && this.generationCount < this.generationLimit) {
      this._iterate()
      setTimeout(() => {
        this.play()
      }, 100)
    }
  }

  startPlaying () {
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
    this.generationCount = 0
    this.deathReached = false
    this.setState({
      cells: this.board.cellStates(),
      generationCount: 0,
      clickCount: 0,
      deathEfficiency: 0
    })
  }

  changeBoardSize (boardSize) {
    this.reset()
    this.setState({
      rows: boardSize,
      cols: boardSize
    }, () => {
      const cells = this.newEmptyBoard(this.state.rows, this.state.cols)
      this.board = new BoardLogic(cells, CellLogic)
      this.setState({
        cells: cells
      })
    })
  }

  countLiveCells () {
    return this.board.cellStates().flat().reduce((acc, cellState) => {
      return acc + cellState
    }, 0)
  }

  handleClick (x, y) {
    if (this.state.clickCount < this.state.clickLimit) {
      this.board.toggleCellState(y, x)

      this.setState({
        clickCount: this.state.clickCount + 1,
        cells: this.board.cellStates()
      })
    }
  }

  loadMap (map) {
    this.board = new BoardLogic(map.cells, CellLogic)
    this.setState({
      rows: map.cells.length,
      cols: map.cells.length,
      cells: map.cells
    })
  }

  saveBoard (name) {
    const data = {
      name: name,
      cells: this.state.cells
    }
    axios.post('/api/maps', data)
    this.setState({
      presets: this.state.presets.concat([data])
    })
    return data
  }

  render () {
    return (
      <div className="board-container">
        <div className="board-div" style={{ width: WIDTH, maxWidth: WIDTH, height: HEIGHT, maxHeight: HEIGHT }}>
          {this.state.cells.map((row, i) => row.map((cell, j) =>
            (<Cell x={j} y={i} state={cell} cellSize={WIDTH / this.state.cols} key={`${j}, ${i}`} onClick={() => this.handleClick(j, i)}/>)
          ))}
        </div>

        <Controls
          playFunc={this.startPlaying}
          stepFunc={this.iterate}
          pauseFunc={this.pause}
          resetFunc={this.reset}
          unlimitedFunc={this.setUnlimited}
          changeBoardSizeFunc={this.changeBoardSize}
          changeGenerationLimitFunc={this.changeGenerationLimit}
          changeClickLimitFunc={this.changeClickLimit}
        />

        <div className="generationCounter">
          {`Generations: ${this.state.generationCount}`}
        </div>
        <div className="generationLimit">
          {`Generation Limit: ${this.state.generationLimit}`}
        </div>
        <div className="clickCounter">
          {`Click Count: ${this.state.clickCount}`}
        </div>
        <div className="clickLimit">
          {`Click Limit: ${this.state.clickLimit}`}
        </div>
        <div className="death-efficiency">
          {`Death Efficiency: ${this.state.deathEfficiency}`}
        </div>

        <MapList
          presets={this.state.presets}
          saveBoardFunc={this.saveBoard}
          loadMapFunc={this.loadMap}
        />
      </div>
    )
  }
}
export default Board
