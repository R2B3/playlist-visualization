import React, { Component } from 'react'
import YearChart from './YearChart'
import YearHeader from './YearHeader'


const createPeriodArray = (period_start, period_end, period_length) => {
  const result = {}
  let current = period_start

  do {
    result[current] = {
      from_year: current,
      to_year: current + period_length - 1,
      count: 0
    }
    current += period_length
  } while(current <= period_end)

  return result
}

const getPeriod = (date, period_length) => (Math.floor(new Date(date).getFullYear() / period_length)) * period_length

const prepareData = (playlists) => {
  const tracks_dates = [];
  playlists.forEach(playlist =>
    playlist.tracks.forEach(track => tracks_dates.push(new Date(track.album_release_date))));

  const tracks_years = tracks_dates.map(x => x.getFullYear());
  const unique_tracks_years = tracks_years.filter((elem, pos, arr) => arr.indexOf(elem) == pos);
  const min_date = Math.min(...unique_tracks_years)
  const max_date = Math.max(...unique_tracks_years)

  const period_length = 1
  const period_start = (Math.floor(min_date / period_length)) * period_length
  const period_end = (Math.floor(max_date / period_length)) * period_length

  const period_array = createPeriodArray(period_start, period_end, period_length)

  const result = playlists.map(playlist => {
    const periods = createPeriodArray(period_start, period_end, period_length)
    playlist.tracks.forEach(track => {
      const release_date_year = getPeriod(track.album_release_date, period_length)
      periods[release_date_year].count++
    })
    const periods_percent = []
    Object.keys(periods).forEach(x => periods_percent.push({
      from_year: periods[x].from_year,
      to_year: periods[x].to_year,
      count: periods[x].count,
      count_percent: periods[x].count / playlist.tracks.length
    }))

    return {
        name: playlist.name,
        periods_percent
    }
  })
  return result
}

const YearCharts = (props) => {

  return (
    <div>
      <YearHeader colors={props.colors} height={props.headerHeight} />
      {prepareData(props.data).map((x,index) => <YearChart key={index} data={x.periods_percent} label={x.name} colors={props.colors}/>)}
    </div>)
}

export default YearCharts;
