import React, { Component } from 'react'
import SongCharacterChart from './SongCharacterChart'



class SongCharacterCharts extends Component {

  constructor(props) {
    super(props)

    const character_per_playlist = this.props.data.map(playlist => {
      const danceability = playlist.tracks.map(track => track.audio_features.danceability).sort((a, b) => a - b)
      const danceability_median = (danceability[(danceability.length - 1) >> 1] + danceability[danceability.length >> 1]) / 2

      const energy = playlist.tracks.map(track => track.audio_features.energy).sort((a, b) => a - b)
      const energy_median = (energy[(energy.length - 1) >> 1] + energy[energy.length >> 1]) / 2

      const valence = playlist.tracks.map(track => track.audio_features.valence).sort((a, b) => a - b)
      const valence_median = (valence[(valence.length - 1) >> 1] + valence[valence.length >> 1]) / 2

      return {
        danceability_median,
        energy_median,
        valence_median,
      } })

      console.log('character_per_playlist')
      console.log(character_per_playlist)
      this.state = {data: character_per_playlist}

  }

  render() {

    return (
      <div>
        {this.state.data.map((x, index) => <SongCharacterChart key={index} data={x} colors={this.props.colors} />)}
      </div>
    )
  }
}

export default SongCharacterCharts;
