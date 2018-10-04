import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
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
  height: 200,
  width: 280
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

    this.state = {
      data,
      sorted: null
    };
  }

  sort = (sortOrder, componentId, config) => {
    const sortedData = this.state.data.sort((a, b) => sortOrder.indexOf(a.name) > sortOrder.indexOf(b.name))
    const sorted = {id: componentId, config}
    this.setState({
      data: sortedData,
      sorted
    })

  }



  render() {
    return (
      <div className="App">
        <div style={boxStyle}><PlaylistColumn id={0} data={this.state.data} colors={colors} headerHeight={headerHeight} chartBoxStyle={chartBoxStyle}  sort={this.sort} sorted={this.state.sorted} /></div>
        <div style={boxStyle}><SongCharacterCharts id={4} data={this.state.data} colors={colors} headerHeight={headerHeight} chartBoxStyle={chartBoxStyle} sort={this.sort} sorted={this.state.sorted} /></div>
        <div style={boxStyle}><YearCharts id={1} data={this.state.data} colors={colors} headerHeight={headerHeight} chartBoxStyle={chartBoxStyle}  sort={this.sort} sorted={this.state.sorted} /></div>
        <div style={boxStyle}><PopularityCharts id={2} data={this.state.data} colors={colors} headerHeight={headerHeight} chartBoxStyle={chartBoxStyle}  sort={this.sort} sorted={this.state.sorted} /></div>
        <div style={boxStyle}><ExplicitCharts id={3} data={this.state.data} colors={colors}  headerHeight={headerHeight} chartBoxStyle={chartBoxStyle} sort={this.sort} sorted={this.state.sorted} /></div>
      </div>
    );
  }
}

export default App;
