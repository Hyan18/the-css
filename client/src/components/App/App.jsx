import React from 'react'
import Board from '../Board/Board'
import './App.css'
import background from './background2.png'
import { Text } from '../Text/Text'

const App = () => {
  return (
    <div className="app-container">
      <div className="bg-color">
        <img src={background} alt="bg" className="bg"></img>
      </div>
      <Text />
      <Board />
    </div>
  )
}

export default App
