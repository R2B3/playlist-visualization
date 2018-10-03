import React from 'react'
import {PieChart, Pie, Sector, Cell} from 'recharts'

const ExplicitChart = (props) => {
  return (
    <div style={props.chartBoxStyle} >
      <PieChart width={140} height={100}  margin={{top: 20, right: 20, bottom: 0, left: 20}}>
        <Pie
          data={props.data}
          dataKey='value'
          cx={50}
          cy={50}
          startAngle={360}
          endAngle={0}
          innerRadius={15}
          outerRadius={30}
          paddingAngle={0}>
            <Cell key={0} fill={props.colors.coldDark} stroke='none' />
            <Cell key={1} fill={props.colors.hot} stroke='none' />
        </Pie>
      </PieChart>
    </div>)
}

export default ExplicitChart
