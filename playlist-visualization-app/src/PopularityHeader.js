import React, { Component } from 'react'


const calculateAveragePopularity = (playlists) => {
  const result = playlists.map(playlist => {

    const trackCount = playlist.tracks.length
    const popularity = playlist.tracks.reduce((accumulator, currentTrack) =>  {return accumulator + currentTrack.track_popularity / trackCount}, 0)

    return {
      name: playlist.name,
      popularity
    }
  })
  return result
}

const PopularityHeader = (props) => {
  const sortIcon = (sorted) => {
    if (!props.sorted || props.sorted.id !== props.id) return ""
    return props.sorted.config ? "less to more" : "more to less"
  }

  const sort = () => {
    const ascending = (props.sorted && props.sorted.id === props.id) ? !props.sorted.config : false
    const playlistAveragePopularity = calculateAveragePopularity(props.data)

    const sortOrder = playlistAveragePopularity.sort((a, b) => ascending ? (a.popularity > b.popularity) : (a.popularity < b.popularity))
    console.log(sortOrder)
    props.sort(sortOrder.map(x => x.name), props.id, ascending)
  }


  return (
    <div style={props.chartBoxStyle}>
      <a onClick={sort}><h1 style={{color: props.colors.headerFont}}>Popularity</h1>
      <h2 style={{color: props.colors.headerFont}}>{sortIcon()}</h2></a>
    </div>
  )
}

export default PopularityHeader
