import React from 'react';
import logo from './logo.png';
import './App.scss';
import {Calculator} from "./components/Calculator";

function App() {
  return (
    <div className="App">
        <img src={logo} alt="Equal Experts" />
        <Calculator/>
    </div>
  );
}

export default App;
