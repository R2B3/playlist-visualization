import React, { Component } from 'react'
import PopularityChart from './PopularityChart'
import PopularityHeader from './PopularityHeader'
import tinygradient from 'tinygradient'

const calculateExplicitShare = (tracks) => {
  const increment = 1 / tracks.length;
  return tracks.reduce((accumulator, current) =>  current.track_explicit == true ? accumulator + increment : accumulator, 0)
}

const getGradient = (from, to) => tinygradient(from, to)

const prepareData = (data) => {
  return data.map(playlist => {
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
}

const PopularityCharts = (props) => {
  return (
    <div>
      <PopularityHeader colors={props.colors} height={props.headerHeight} data={props.data}  sort={props.sort} sorted={props.sorted}  id={props.id}  chartBoxStyle={props.chartBoxStyle} />
      {prepareData(props.data).map((x, index) => <PopularityChart key={index} data={x.data} gradient={getGradient(props.colors.cold, props.colors.hot)} />)}
    </div>
  )
}

export default PopularityCharts
