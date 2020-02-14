import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ParameterInput from '../ParameterInput/ParameterInput'

export default class Controls extends Component {
  constructor (props) {
    super(props)
    this.mapName = ''
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

  render () {
    return (
      <div className="controls-container">
        <div className="iteration-container">
          <button className="play-button" onClick={this.props.playFunc}>Play</button>
          <button className="step-button" onClick={this.props.stepFunc}>Step</button>
          <button className="pause-button" onClick={this.props.pauseFunc}>Pause</button>
          <button className="reset-button" onClick={this.props.resetFunc}>Reset</button>
          <button className="unlimited-button" onClick={this.props.unlimitedFunc}>Unlimited</button>
        </div>

        <ParameterInput
          parameter="board-size"
          prompt="Size:"
          buttonText="Resize"
          func={this.props.changeBoardSizeFunc}
        />

        <ParameterInput
          parameter="generation-limit"
          prompt="Generation Limit:"
          buttonText="Set"
          func={this.props.changeGenerationLimitFunc}
        />

        <ParameterInput
          parameter="click-limit"
          prompt="Click Limit:"
          buttonText="Set"
          func={this.props.changeClickLimitFunc}
        />
      </div>
    )
  }
}

Controls.propTypes = {
  playFunc: PropTypes.func.isRequired,
  stepFunc: PropTypes.func.isRequired,
  pauseFunc: PropTypes.func.isRequired,
  resetFunc: PropTypes.func.isRequired,
  unlimitedFunc: PropTypes.func.isRequired,
  changeBoardSizeFunc: PropTypes.func.isRequired,
  changeGenerationLimitFunc: PropTypes.func.isRequired,
  changeClickLimitFunc: PropTypes.func.isRequired
}
