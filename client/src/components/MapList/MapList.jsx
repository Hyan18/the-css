import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import ParameterInput from '../ParameterInput/ParameterInput'

export default class MapList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      maps: []
    }

    this.saveBoard = this.saveBoard.bind(this)
  }

  async getAllMaps () {
    const res = await axios.get('/api/maps')

    const maps = res.data.length > 0 ? res.data : [{ name: 'None', cells: [[0]] }]

    this.setState({
      maps: maps
    })
  }

  componentDidMount () {
    this.getAllMaps()
  }

  saveBoard (name) {
    this.setState({
      maps: this.state.maps.concat([this.props.saveBoardFunc(name)])
    })
  }

  render () {
    const { loadMapFunc } = this.props

    return (
      <div className="map-list">
        <ParameterInput
          parameter="map-name"
          prompt="Name:"
          buttonText="Save"
          func={this.saveBoard}
        />

        <ul>
          {this.state.maps.map((map, i) =>
            (
              <li key={i} value={map.name}>
                {map.name}
                <button className="map-select-button" onClick={() => loadMapFunc(map)}>Select</button>
              </li>
            )
          )}
        </ul>
      </div>
    )
  }
}

MapList.propTypes = {
  saveBoardFunc: PropTypes.func.isRequired,
  loadMapFunc: PropTypes.func.isRequired
}
