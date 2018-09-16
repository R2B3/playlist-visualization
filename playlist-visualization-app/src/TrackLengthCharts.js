import React, { Component } from 'react'
import TrackLengthChart from './TrackLengthChart'

const calculateExplicitShare = (tracks) => {
  const increment = 1 / tracks.length;
  return tracks.reduce((accumulator, current) =>  current.track_explicit == true ? accumulator + increment : accumulator, 0)
}
class TrackLengthCharts extends Component {

  constructor(props) {
    super(props)
    const track_lengths_per_playlist = props.data.map(playlist => {
      return {
        name: playlist.name,
        data: playlist.tracks.map(x => x.track_duration)
      }
    })

    const median_track_length_per_playlist = track_lengths_per_playlist.map(playlist => {
      const tracks_sorted = playlist.data.sort((a, b) => a - b)
      const median = (tracks_sorted[(tracks_sorted.length - 1) >> 1] + tracks_sorted[tracks_sorted.length >> 1]) / 2
      const max = tracks_sorted[tracks_sorted.length -1]
      const min = tracks_sorted[0]

      return {
        name: playlist.name,
        data: [{
          median: median / 60000,
          max: max / 60000,
          min: min / 60000,
        }]
      }})

    const max_length = median_track_length_per_playlist.reduce((accumulator, current) => current.data[0].max > accumulator ? current.data[0].max : accumulator, 0)



    const ticks = Array.from(Array(Math.ceil(max_length) + 1).keys())

    const averaged_track_length_per_playlist = track_lengths_per_playlist.map(playlist => {
      const no_of_tracks = playlist.data.length
      return {
        name: playlist.name,
        data: playlist.data.reduce((accumulator, current) => accumulator + current / no_of_tracks, 0)
      }})

    const averaged_track_length_per_playlist_minutes = averaged_track_length_per_playlist.map(playlist => {
      return {
        name: playlist.name,
        data: playlist.data / 60000,
      }})

    this.state = { data: median_track_length_per_playlist, max_length, ticks}

  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

  }

  render() {

    return (
      <div>
        {this.state.data ? this.state.data.map((x,index) => <TrackLengthChart key={index} data={x.data} max={this.state.max_length} ticks={this.state.ticks} label={x.name} colors={this.props.colors}/>) : ""}
      </div>
    )
  }
}

export default TrackLengthCharts;
