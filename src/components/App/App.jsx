import React from 'react';
import Board from '../Board/Board'
import { Text } from '../Text/Text'
import './App.css'

const App = () => (
  
  <div className="app-container">
    <div className="description-div">
      <Text />
    </div>
    <Board />
  </div>
);

export default App;
