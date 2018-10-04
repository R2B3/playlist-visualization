import React, { Component } from 'react'

const calculateAgeInDaysForOneTrack = (track) => ((new Date()).getTime() - new Date(track.album_release_date).getTime()) / 86400000

const calculateAverageAge = (playlists) => {
  const result = playlists.map(playlist => {

    const trackCount = playlist.tracks.length
    const age = playlist.tracks.reduce((accumulator, currentTrack) =>  {return accumulator + calculateAgeInDaysForOneTrack(currentTrack) / trackCount}, 0)

    return {
      name: playlist.name,
      age
    }
  })
  return result
}

const YearHeader = (props) => {

  const sortIcon = (sorted) => {
    if (!props.sorted || props.sorted.id !== props.id) return ""
    return props.sorted.config ? "old to young" : "young to old"
  }

  const sort = () => {
    const ascending = (props.sorted && props.sorted.id === props.id) ? !props.sorted.config : false
    const playlistAverageAge = calculateAverageAge(props.data)

    const sortOrder = playlistAverageAge.sort((a, b) => ascending ? (a.age < b.age) : (a.age > b.age))
    props.sort(sortOrder.map(x => x.name), props.id, ascending)
  }

  return (
    <div style={props.chartBoxStyle}>
      <a onClick={sort}><h1 style={{color: props.colors.headerFont}}>Release year</h1>
      <h2 style={{color: props.colors.headerFont}}>{sortIcon()}</h2></a>
    </div>
  )
}

export default YearHeader
