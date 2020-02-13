import React, { useState, useEffect } from 'react'
import Board from '../Board/Board'
import './App.css'

import exampleService from '../../services/exampleService'

const App = () => {
  const [examples, setExamples] = useState(null)

  useEffect(() => {
    if (!examples) {
      getExamples()
    }
  })

  const getExamples = async () => {
    const res = await exampleService.getAll()
    setExamples(res)
  }

  return (
    <div className="app-container">
      <Board />
    </div>
  )
}

export default App
