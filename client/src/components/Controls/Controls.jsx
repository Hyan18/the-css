import React, { Component } from 'react'

export default class Controls extends Component {
  constructor (props) {
    super(props)
    this.mapName = ""
    this.boardSize = 10
  }

  handleMapNameChange (event) {
    this.mapName = event.target.value
  }

  handleSizeChange (event) {
    this.boardSize = parseInt(event.target.value)
  }
  
  handleGenerationChange (event) {
    this.generationLimit = parseInt(event.target.value)
  }

  render () { return (
    <div className="controls-container">
      <div className="iteration-container">
        <button className="play-button" onClick={this.props.playFunc}>Play</button>
        <button className="step-button" onClick={this.props.stepFunc}>Step</button>
        <button className="pause-button" onClick={this.props.pauseFunc}>Pause</button>
        <button className="reset-button" onClick={this.props.resetFunc}>Reset</button>
        <button className="unlimited-button" onClick={this.props.unlimitedFunc}>Unlimited</button>
      </div>

      <label className="map-name">
        Name:
        <input type="text" className="map-name" onChange={(event) => this.handleMapNameChange(event)}/>
      </label>
      <button className="save-map-button" onClick={() => this.props.saveBoardFunc(this.mapName)}>Save</button>

      <label className="board-size">
        Size:
        <input type="text" className="board-size" onChange={(event) => this.handleSizeChange(event)}/>
      </label>
      <button className="board-size-button" onClick={() => this.props.changeBoardSizeFunc(this.boardSize)}>Resize</button>

      <label className="generation-limit">
        Generation Limit:
        <input type="text" className="generation-limit" onChange={(event) => this.handleGenerationChange(event)}/>
      </label>
      <button className="generation-limit-button" onClick={() => this.props.changeGenerationLimitFunc(this.generationLimit)}>Submit</button>
    </div>
  )}
}
