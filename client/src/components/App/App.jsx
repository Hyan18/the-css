import React from 'react'
import Board from '../Board/Board'
import { Text } from '../Text/Text'
import './App.css'
import background from './background2.png'

const App = () => {
  return (
    <div className="app-container">
      <div className="bg-color">
        <img src={background} alt="bg" class="bg"></img>
      </div>
      <Text />
      <Board />
    </div>
  )
}

export default App
