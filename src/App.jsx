import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Swap from './components/swap/swap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Swap/>
      </div>
    );
  }
}

export default App;
