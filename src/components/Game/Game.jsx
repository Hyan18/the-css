import React, { Component } from 'react'
import Board from '../Board/Board'
import './Game.css'
import { Text } from '../Text/Text'

class Game extends Component {
  render = () => {
    return (
      <div className="game-container">
        <div className="description-div">
          <Text />
        </div>
        <Board />
      </div>
    )
  }
}

export default Game