import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import PlaylistLabel from './PlaylistLabel'
import YearCharts from './YearCharts'
import ExplicitCharts from './ExplicitCharts'
import PopularityCharts from './PopularityCharts'
import TrackLengthCharts from './TrackLengthCharts'
import SongCharacterCharts from './SongCharacterCharts'
import PlaylistColumn from './PlaylistColumn'

const boxStyle= {
   float: 'left'
}

const chartBoxStyle = {
  height: 100
}


const chartAreaHeight = 100
const headerHeight = 200

const colors = {
  background: '#0F0F0F',
  dynamic: '#95C623',
  hot: '#E55812',
  cold: '#065A82',
  lowkey: '#061A1B',
  dynamicDarker: '#37480D',
  hotDarker: '#542007',
  coldDarker: '#03293C',
  dynamicDark: '#1C2407',
  hotDark: '#2A1004',
  coldDark: '#021924',
  headerFont: '#3A3A3A',
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

  sort = (sortOrder) => {
    console.log('sort me')
  }



  render() {
    return (
      <div className="App">
        <div style={boxStyle}><PlaylistColumn data={this.state.data} colors={colors} headerHeight={headerHeight} chartBoxStyle={chartBoxStyle} /></div>
        <div style={boxStyle}><YearCharts data={this.state.data} colors={colors} headerHeight={headerHeight} chartBoxStyle={chartBoxStyle} /></div>
        <div style={boxStyle}><PopularityCharts data={this.state.data} colors={colors} headerHeight={headerHeight} chartBoxStyle={chartBoxStyle} /></div>
        <div style={boxStyle}><ExplicitCharts data={this.state.data} colors={colors}  headerHeight={headerHeight} chartBoxStyle={chartBoxStyle} /></div>
        <div style={boxStyle}><SongCharacterCharts data={this.state.data} colors={colors} headerHeight={headerHeight} chartBoxStyle={chartBoxStyle} sort={this.sort} /></div>
      </div>
    );
  }
}

export default App;
