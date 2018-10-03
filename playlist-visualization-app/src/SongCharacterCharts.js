import React, { Component } from 'react'
import SongCharacterChart from './SongCharacterChart'
import SongCharacterHeader from './SongCharacterHeader'

const getFeatures = (colors) => {
  return [{
    name: 'danceability',
    colorNeedle: colors.hot,
    colorRange: colors.hotDarker,
    colorBackground: colors.hotDark,
  }, {
    name: 'energy',
    colorNeedle: colors.dynamic,
    colorRange: colors.dynamicDarker,
    colorBackground: colors.dynamicDark,
  }, {
    name: 'valence',
    colorNeedle: colors.cold,
    colorRange: colors.coldDarker,
    colorBackground: colors.coldDark,
  }]
}

const characterPerPlaylist = (data, colors) => data.map(playlist => getFeatures(colors).map(feature => calculateCharacter(playlist, feature.name)))

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

const SongCharacterCharts = (props) => {
  return (
    <div>
      <SongCharacterHeader colors={props.colors} height={props.headerHeight} features={getFeatures(props.colors)} />
      {characterPerPlaylist(props.data, props.colors).map((x, index) => <SongCharacterChart key={index} features={getFeatures(props.colors)} data={x} colors={props.colors} />)}
    </div>
  )
}

export default SongCharacterCharts
