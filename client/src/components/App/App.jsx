import React, { useState, useEffect } from 'react'
import Board from '../Board/Board'
import { Text } from '../Text/Text'
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

  const renderExample = example => {
    return (
      <li key={example._id} className="list__item example">
        <h3 className="example__name">{example.name}</h3>
        <p className="example__description">{example.description}</p>
      </li>
    )
  }

  return (
    <div className="app-container">
      {/* <Text /> */}
      <Board />
      {/* <ul className="example_list">
        {(examples && examples.length > 0) ? (
          examples.map(example => renderExample(example))
        ) : (
          <p>No examples found</p>
        )}
      </ul> */}
    </div>
  )
}

export default App
