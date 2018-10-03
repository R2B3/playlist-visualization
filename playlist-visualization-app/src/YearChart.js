import React, { Component } from 'react'
import { BarChart, Bar, XAxis } from 'recharts'

const YearChart = (props) => {
  return (
    <BarChart width={200} height={100} data={props.data} margin={{top: 20, right: 20, bottom: 0, left: 20}}>
     <Bar dataKey="count_percent" fill={props.colors.cold} />
     <XAxis dataKey="from_year" tick={{stroke: props.colors.lowkey, strokeWidth: 0.5}} />
    </BarChart>
  )
}

export default YearChart
