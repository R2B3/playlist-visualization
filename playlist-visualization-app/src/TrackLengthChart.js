import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

class TrackLength extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BarChart width={200} height={100} data={this.props.data} layout='vertical' margin={{top: 20, right: 20, bottom: 0, left: 20}}>
      <Bar dataKey="min" fill={this.props.colors.dynamic} />
      <Bar dataKey="median" fill={this.props.colors.cold} />
      <Bar dataKey="max" fill={this.props.colors.hot} />
      <XAxis type="number" domain={[0, this.props.max]} ticks={this.props.ticks} />
      <YAxis type="category" dataKey="name" hide="true" />
      </BarChart>
    )
  }
}

export default TrackLength;
