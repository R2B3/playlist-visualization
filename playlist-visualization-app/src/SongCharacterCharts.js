import React, { Component } from 'react'
import SongCharacterChart from './SongCharacterChart'
import SongCharacterHeader from './SongCharacterHeader'

const calculateCharacter = (playlist, audioFeatureName) => {
  const featureOnly = playlist.tracks.map(track => track.audio_features[audioFeatureName]).sort((a, b) => a - b)
  const median = (featureOnly[(featureOnly.length - 1) >> 1] + featureOnly[featureOnly.length >> 1]) / 2
  const min = Math.min(...featureOnly)
  const max = Math.max(...featureOnly)

  return {
    name: audioFeatureName,
    min,
    max,
    median
  }
}

class SongCharacterCharts extends Component {

  constructor(props) {
    super(props)

    const features = [
      {
        name: 'danceability',
        colorNeedle: this.props.colors.hot,
        colorRange: this.props.colors.hotDarker,
        colorBackground: this.props.colors.hotDark,
      }, {
        name: 'energy',
        colorNeedle: this.props.colors.dynamic,
        colorRange: this.props.colors.dynamicDarker,
        colorBackground: this.props.colors.dynamicDark,
      }, {
        name: 'valence',
        colorNeedle: this.props.colors.cold,
        colorRange: this.props.colors.coldDarker,
        colorBackground: this.props.colors.coldDark,
      }]

    const character_per_playlist = this.props.data.map(playlist => features.map(feature => calculateCharacter(playlist, feature.name)))

    this.state = {
      features,
      data: character_per_playlist
    }
  }

  render() {

    return (
      <div>
        <SongCharacterHeader colors={this.props.colors} height={this.props.headerHeight} features={this.state.features} sort={this.props.sort}/>
        {this.state.data.map((x, index) => <SongCharacterChart key={index} features={this.state.features} data={x} colors={this.props.colors} />)}
      </div>
    )
  }
}

export default SongCharacterCharts;
