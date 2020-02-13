import React, { Component } from 'react'

export default class Controls extends Component {
  render () { return (
    <div className="controls-container">
      <button className="play-button" onClick={this.props.playFunc}>Play</button>
      <button className="step-button" onClick={this.props.stepFunc}>Step</button>
      <button className="pause-button" onClick={this.props.pauseFunc}>Pause</button>
      <button className="reset-button" onClick={this.props.resetFunc}>Reset</button>
      <button className="unlimited-button" onClick={this.props.unlimitedFunc}>Unlimited</button>
    </div>
  )}
}
