import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './BarChart'
import Globe from './Globe'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="Viz-title">Plot</h1>
        </header>
	    <div>
	    <Globe />
	//<BarChart data={[5,12,10,4.4,10,5.6,3,2]} size={[600,600]} />
	    </div>
      </div>
    );
  }
}

export default App;
