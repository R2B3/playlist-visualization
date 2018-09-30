import React, { Component } from 'react'
import PopularityChart from './PopularityChart'
import PopularityHeader from './PopularityHeader'
import tinygradient from 'tinygradient'

const calculateExplicitShare = (tracks) => {
  const increment = 1 / tracks.length;
  return tracks.reduce((accumulator, current) =>  current.track_explicit == true ? accumulator + increment : accumulator, 0)
}
class PopularityCharts extends Component {

  constructor(props) {
    super(props)
    const result = props.data.map(playlist => {
      return {
        name: playlist.name,
        data: playlist.tracks.map(x => {return { x: x.track_popularity, y: 0, r: 1 }})
          .sort((a, b) => a.x - b.x )
          .reduce((accumulator, current, index) => {
            if (index === 0)
              return [current]

            const previous = accumulator[accumulator.length - 1]
            if (previous.x == current.x)
              return [...accumulator, {x: current.x, y: previous.y + 1, r: current.r }]
            return [...accumulator, {x: current.x, y: 0, r: current.r }]
          }, [])
      }
    })

    const gradient = tinygradient(this.props.colors.cold, this.props.colors.hot);

    this.state = {data: result, gradient}
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

  }

  render() {

    return (
      <div>
        <PopularityHeader colors={this.props.colors} height={this.props.headerHeight} />
        {this.state.data.map((x, index) => <PopularityChart key={index} data={x.data} gradient={this.state.gradient} />)}
      </div>
    )
  }
}

export default PopularityCharts;
