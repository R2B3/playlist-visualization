import React, { Component } from 'react'
import {PieChart, Pie, Sector, Cell} from 'recharts'


const rewrite_data = (median) => {
  const width = 0.1
  const result =
    [{
      name: '',
      value: median - width
    }, {
      name: '',
      value: width
    }, {
      name: '',
      value: 1 - median
    }]
    console.log(result)
    return result
}

class SongCharachterChart extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <PieChart width={140} height={100} onMouseEnter={this.onPieEnter} margin={{top: 20, right: 20, bottom: 0, left: 20}}>
        <Pie
          data={rewrite_data(this.props.data.danceability_median)}
          dataKey='value'
          cx={50}
          cy={50}
          startAngle={180}
          endAngle={0}
          innerRadius={15}
          outerRadius={24}
          paddingAngle={0}>
            <Cell key={0} fill={this.props.colors.background} stroke={this.props.colors.hot} />
            <Cell key={1} fill={this.props.colors.hot}  stroke={this.props.colors.hot} />
            <Cell key={2} fill={this.props.colors.background} stroke={this.props.colors.hot} />
        </Pie>
        <Pie
          data={rewrite_data(this.props.data.energy_median)}
          dataKey='value'
          cx={50}
          cy={50}
          startAngle={180}
          endAngle={0}
          innerRadius={25}
          outerRadius={34}
          paddingAngle={0}>
          <Cell key={0} fill={this.props.colors.background} stroke={this.props.colors.dynamic} />
          <Cell key={1} fill={this.props.colors.dynamic}  stroke={this.props.colors.dynamic} />
          <Cell key={2} fill={this.props.colors.background} stroke={this.props.colors.dynamic} />
        </Pie>
        <Pie
          data={rewrite_data(this.props.data.valence_median)}
          dataKey='value'
          cx={50}
          cy={50}
          startAngle={180}
          endAngle={0}
          innerRadius={35}
          outerRadius={44}
          paddingAngle={0}>
          <Cell key={0} fill={this.props.colors.background} stroke={this.props.colors.cold} />
          <Cell key={1} fill={this.props.colors.cold}  stroke={this.props.colors.cold} />
          <Cell key={2} fill={this.props.colors.background} stroke={this.props.colors.cold} />
        </Pie>
      </PieChart>
    )
  }
}

export default SongCharachterChart;
