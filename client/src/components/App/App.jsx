import React, { useState, useEffect } from 'react'
import Board from '../Board/Board'
import { Text } from '../Text/Text'
import './App.css'

const App = () => {
  return (
    <div className="app-container">
      <Text />
      <Board />
    </div>
  )
}

export default App
