import React, { Component } from 'react'
import {ScatterChart, Scatter, Cell, XAxis, YAxis, Legend} from 'recharts'


const PopularityChart = (props) => {
  return (
    <ScatterChart width={200} height={100} margin={{top: 20, right: 20, bottom: 0, left: 20}}>
      <XAxis type="number" dataKey={'x'} name='popularity' unit='' domain={[0, 100]} tick={{stroke: '#3A4254', strokeWidth: 0.5}} />
      <YAxis type="number" dataKey={'y'} name='' unit='' domain={[-1, 10]} hide/>
      <Scatter name='' data={props.data} shape='square' >
        {
            props.data.map((entry, index) => {
              return <Cell key={`cell-${index}`} fill={props.gradient.rgbAt(entry.x / 100)} />
          })
        }
      </Scatter>
    </ScatterChart>
  )
}

export default PopularityChart
