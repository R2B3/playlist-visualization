import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import PlaylistLabel from './PlaylistLabel'
import YearCharts from './YearCharts'
import ExplicitCharts from './ExplicitCharts'
import PopularityCharts from './PopularityCharts'
import TrackLengthCharts from './TrackLengthCharts'
import SongCharacterCharts from './SongCharacterCharts'

const boxStyle= {
   float: 'left'
}

const colors = {
  background: '#0F0F0F',
  dynamic: '#95C623',
  hot: '#E55812',
  cold: '#065A82',
  lowkey: '#061A1B',
}

class App extends Component {

  constructor(props) {
    super(props);

    const data = require('./data.json');
    console.log(data)
    this.state = {
      data,
    };
  }

  render() {
    return (
      <div className="App">
        <div style={boxStyle}>
          <PlaylistLabel name={this.state.data[0].name} />
          <PlaylistLabel name={this.state.data[1].name} />
          <PlaylistLabel name={this.state.data[2].name} />
          <PlaylistLabel name={this.state.data[3].name} />
        </div>

        <div style={boxStyle}><YearCharts data={this.state.data} colors={colors}/></div>
        <div style={boxStyle}><PopularityCharts data={this.state.data} colors={colors} /></div>
        <div style={boxStyle}><ExplicitCharts data={this.state.data} colors={colors}  /></div>
        <div style={boxStyle}><TrackLengthCharts data={this.state.data} colors={colors}  /></div>
        <div style={boxStyle}><SongCharacterCharts  data={this.state.data} colors={colors}  /></div>
      </div>
    );
  }
}

export default App;
