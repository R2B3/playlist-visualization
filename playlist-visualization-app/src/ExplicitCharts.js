import React, { Component } from 'react'
import ExplicitChart from './ExplicitChart'
import ExplicitHeader from './ExplicitHeader'

const calculateExplicitShare = (tracks) => {
  const increment = 1 / tracks.length;
  return tracks.reduce((accumulator, current) =>  current.track_explicit == true ? accumulator + increment : accumulator, 0)
}
class ExplicitCharts extends Component {

  constructor(props) {
    super(props)
    const result = props.data.map(playlist => {
      return {
        name: playlist.name,
        data: [{
          name: 'Not Explicit',
          value: 1 - calculateExplicitShare(playlist.tracks),
        }, {
          name: 'Explicit',
          value: calculateExplicitShare(playlist.tracks),
        }]}})
    this.state = {data: result}
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

  }

  render() {

    return (
      <div>
        <ExplicitHeader height={this.props.headerHeight} colors={this.props.colors}/>
        {this.state.data.map((x, index) => <ExplicitChart key={index} data={x.data} colors={this.props.colors} chartBoxStyle={this.props.chartBoxStyle} />)}
      </div>
    )
  }
}

export default ExplicitCharts;
