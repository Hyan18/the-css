import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MapList extends Component {

  render () {
    const { presets, onClick } = this.props

    return (
      <ul>
        {presets.map((preset, i) =>
          (
            <li key={i} value={preset.name}>
              {preset.name}
              <button className="map-select-button" onClick={() => onClick(preset.name)}>Select</button>
            </li>
          )
        )}
      </ul>
    )
  }
}

MapList.propTypes = {
  presets: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}
