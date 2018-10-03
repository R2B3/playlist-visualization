import React, { Component } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

const rewriteData = (data, needleWidth) => {
  const result =
    [{
      name: '',
      value: data.min,
    },{
      name: '',
      value: data.median - (data.min + needleWidth/2)
    }, {
      name: '',
      value: needleWidth,
    }, {
      name: '',
      value: data.max - (data.median + needleWidth/2)
    }, {
      name: '',
      value: 1 -  data.max
    }]
    return result
}

const getPies = (features, data) => {
  const settings = [{
    needleWidth: 0.08,
    innerRadius: 15,
    outerRadius: 24
  }, {
    needleWidth: 0.05,
    innerRadius: 25,
    outerRadius: 34
  }, {
    needleWidth: 0.08,
    innerRadius: 35,
    outerRadius: 44
  }]

  return features.map((feature, index) => {
    const currentSettings = settings[index]
    const pieData = rewriteData(data[index], currentSettings.needleWidth)
    const currentFeature = features[index]

    return (
      <Pie
        key={index}
        data={pieData}
        dataKey='value'
        cx={50}
        cy={50}
        startAngle={180}
        endAngle={0}
        innerRadius={currentSettings.innerRadius}
        outerRadius={currentSettings.outerRadius}
        paddingAngle={0}>
          <Cell key={0} fill={currentFeature.colorBackground} stroke='none' />
          <Cell key={1} fill={currentFeature.colorRange}  stroke='none' />
          <Cell key={2} fill={currentFeature.colorNeedle} stroke='none' />
          <Cell key={2} fill={currentFeature.colorRange} stroke='none' />
          <Cell key={2} fill={currentFeature.colorBackground} stroke='none' />
      </Pie>
    )
  })
}


const SongCharachterChart = (props) => {
  return (
        <PieChart width={140} height={100} margin={{top: 20, right: 20, bottom: 0, left: 20}}>
          {getPies(props.features, props.data)}
        </PieChart>
      )
}

export default SongCharachterChart
