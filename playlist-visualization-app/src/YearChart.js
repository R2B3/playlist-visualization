import React, { Component } from 'react'
import { BarChart, Bar, XAxis } from 'recharts'

class YearChart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BarChart width={200} height={100} data={this.props.data} margin={{top: 20, right: 20, bottom: 0, left: 20}}>
       <Bar dataKey="count_percent" fill={this.props.colors.cold} />
       <XAxis dataKey="from_year" tick={{stroke: this.props.colors.lowkey, strokeWidth: 0.5}} />
      </BarChart>
    )
  }
}

export default YearChart;
