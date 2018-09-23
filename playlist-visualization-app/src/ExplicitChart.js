import React, { Component } from 'react'
import {PieChart, Pie, Sector, Cell} from 'recharts'


class ExplicitChart extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <PieChart width={140} height={100} onMouseEnter={this.onPieEnter} margin={{top: 20, right: 20, bottom: 0, left: 20}}>
        <Pie
          data={this.props.data}
          dataKey='value'
          cx={50}
          cy={50}
          startAngle={360}
          endAngle={0}
          innerRadius={15}
          outerRadius={30}
          paddingAngle={0}>
            <Cell key={0} fill={this.props.colors.cold} stroke='none' />
            <Cell key={1} fill={this.props.colors.hot} stroke='none' />

        </Pie>
      </PieChart>
    )
  }
}

export default ExplicitChart;
