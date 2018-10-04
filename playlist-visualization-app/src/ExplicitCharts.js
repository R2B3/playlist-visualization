import React from 'react'
import ExplicitChart from './ExplicitChart'
import ExplicitHeader from './ExplicitHeader'


const calculateExplicitShare = (tracks) => {
  const increment = 1 / tracks.length;
  return tracks.reduce((accumulator, current) =>  current.track_explicit == true ? accumulator + increment : accumulator, 0)
}

const prepareData = (data) => {
  return data.map(playlist => {
    return {
      name: playlist.name,
      data: [{
        name: 'Not Explicit',
        value: 1 - calculateExplicitShare(playlist.tracks),
      }, {
        name: 'Explicit',
        value: calculateExplicitShare(playlist.tracks),
      }]}})
}

const ExplicitCharts = (props) => {
  return (
    <div>
      <ExplicitHeader data={prepareData(props.data)} height={props.headerHeight} colors={props.colors} sort={props.sort} sorted={props.sorted} id={props.id}  chartBoxStyle={props.chartBoxStyle} />
      {prepareData(props.data).map((x, index) => <ExplicitChart key={index} data={x.data} colors={props.colors} chartBoxStyle={props.chartBoxStyle} />)}
    </div>)
}

export default ExplicitCharts
