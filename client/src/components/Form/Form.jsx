import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Form extends Component {
  render () {
    const { name, onSubmit, refer, onClick } = this.props

    return (
      <form className={`set-${name}-limit`} onSubmit={onSubmit}>
        <label>
          {capitalize(name)} Limit
          <input type="number" name={`${name} limit`} ref={refer}/>
        </label>
        <input type="submit" value="Set Limit" onClick={onClick}/>
      </form>
    )
  }
}

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  refer: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  onClick: PropTypes.func.isRequired
}
