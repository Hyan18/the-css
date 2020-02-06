import React from 'react';
import Board from '../Board/Board'
import './App.css'
import { Text } from '../Text/Text'

const App = () => (
  
  <div className="app-container">
    <div className="description-div">
      <Text />
    </div>
    <Board />
  </div>
);

export default App;
