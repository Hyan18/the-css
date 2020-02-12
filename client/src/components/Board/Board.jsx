import React, { Component } from 'react'
import './Board.css'
import Cell from '../Cell/Cell'
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
    this.isPlaying = false
    this.sizeRef = React.createRef()
    this.limitRef = React.createRef()
    this.board = new BoardLogic(this.newEmptyBoard(), CellLogic)
    this.state = {
      presets: [],
      cells: this.board.cellStates(),
      rows: ROWS,
      cols: COLS,
      generationCount: 0
    }

    this.changeBoardSize = this.changeBoardSize.bind(this)
    this.changeLimit = this.changeLimit.bind(this)
    this.handleChangeMap = this.handleChangeMap.bind(this)
    this.clickToSaveBoard = this.clickToSaveBoard.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.saveBoard = this.saveBoard.bind(this)
  }

  async getAllMaps () {
    const res = await axios.get('/api/maps')

    const presets = res.data.length > 0 ? res.data : [{ name: 'None', cells: [[0]] }]

    this.setState({
      presets: presets,
      preset: presets[0].name
    })
  }

  componentDidMount () {
    this.getAllMaps()
  }

  clickToSetLimit () {
    this.limitRef.current.focus()
  }

  clickToResize () {
    this.sizeRef.current.focus()
  }

  clickToSaveBoard () {

  }

  changeLimit (event) {
    event.preventDefault()

    this.generationLimit = this.limitRef.current.value
    this.pause()
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
    this.generationCount = 0
    this.setState({
      cells: this.board.cellStates(),
      generationCount: 0
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
    this.board.toggleCellState(y, x)

    this.setState({ cells: this.board.cellStates() })
  }

  handleChangeMap (event) {
    this.setState({ preset: event.target.value })
  }

  loadMap () {
    const presetName = this.state.preset
    const currentPreset = this.state.presets.find(preset => preset.name === presetName)
    const presetData = currentPreset.cells
    console.log(currentPreset)
    this._setMap(presetData)
  }

  _setMap (data) {
    this.board = new BoardLogic(data, CellLogic)
    this.setState({
      rows: data.length,
      cols: data.length,
      cells: data
    })
  }

  handleNameChange (event) {
    this.setState({ mapName: event.target.value })
  }

  saveBoard (event) {
    event.preventDefault()
    const data = {
      name: this.state.mapName,
      cells: this.state.cells
    }
    axios.post('/api/maps', data)
    this.setState({
      presets: this.state.presets.concat([data])
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
          <form className="save-board" onSubmit={this.saveBoard}>
            <label>
              Map Name:
              <input type="text" onChange={this.handleNameChange}/>
            </label>
            <input type="submit" value="save" onClick={this.clickToSaveBoard.bind(this)}/>
          </form>
          <form className="resize-board" onSubmit={this.changeBoardSize}>
            <label>
              Size:
              <input type="number" placeholder="max 60" ref={this.sizeRef} name="size"/>
            </label>
            <input type="submit" value="submit" onClick={this.clickToResize.bind(this)}/>
          </form>
          <form className="set-generation-limit" onSubmit={this.changeLimit}>
            <label>
              Limit:
              <input type="number" name="limit" ref={this.limitRef}/>
            </label>
            <input type="submit" value="submit" onClick={this.clickToSetLimit.bind(this)}/>
          </form>
          <select className="map-select" onChange={this.handleChangeMap}>
            {this.state.presets && this.state.presets.map((preset, i) =>
              (<option key={i} value={preset.name}>{preset.name}</option>)
            )}
          </select>
          <button className="map-submit-button" onClick={() => this.loadMap()}>Submit</button>
        </div>
        <div className="generationCounter">
          {this.state.generationCount}
        </div>
      </div>
    )
  }
}
export default Board
