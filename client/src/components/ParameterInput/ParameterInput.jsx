import React, { Component } from 'react'

export default class ParameterInput extends Component {
  constructor (props) {
    super(props)
    this.value = ""
  }

  handleInputChange (event) {
    this.value = event.target.value
  }

  render () { return (
    <div className={`${this.props.parameter}-container`}>
      <label className={`${this.props.parameter}-label`}>
        {this.props.prompt}
        <input 
          className={`${this.props.parameter}-input`}
          onChange={event => this.handleInputChange(event)}
        />
      </label>
      <button 
        className={`${this.props.parameter}-button`}
        onClick={() => this.props.func(this.value)}
      >
        {this.props.buttonText}
      </button>
    </div>
  )}
}
