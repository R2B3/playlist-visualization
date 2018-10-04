import React, { Component } from 'react'
import LinkWithFunction from './LinkWithFunction'
const SongCharacterHeader = (props) => {

  const sortIconPerFeature = (feature, id) => {
    if (!props.sorted || props.sorted.config.feature !== feature.name)
      return <LinkWithFunction id={id} text={feature.name} color={feature.colorNeedle} clickMe={sort} />

    if (props.sorted.config.ascending)
      return <LinkWithFunction id={id} text={`less ${feature.name} to more`} color={feature.colorNeedle} clickMe={sort} />

    return <LinkWithFunction id={id} text={`more ${feature.name} to less`} color={feature.colorNeedle} clickMe={sort} />
  }

  const sortIcons = (sorted) => {
      return (<div>{props.features.reverse().map((feature, index) => sortIconPerFeature(feature, index))}</div>)
  }

  const sort = (id) => {
    let ascending
    if (props.sorted && props.features[id].name === props.sorted.config.feature) ascending = !props.sorted.config.ascending
    else ascending = false


    const dataPerFeature = props.features.map(feature => {
      return props.data.map(playlist => {
        const thisFeature = playlist.filter(x => x.name === feature.name)[0]
        return {
          featureName: thisFeature.name,
          playlistName: thisFeature.playlistName,
          median: thisFeature.median,
        }
      })})


    const sortOrder = dataPerFeature[id].sort((a, b) => ascending ? (a.median > b.median) : (a.median < b.median))
    const config = {
      feature: props.features[id].name,
      ascending
    }
    props.sort(sortOrder.map(x => x.playlistName), props.id, config)
  }

  return (
    <div style={props.chartBoxStyle}>
      <h1 style={{color: props.colors.headerFont}}>Character</h1>
      {sortIcons()}
    </div>
  )
}

export default SongCharacterHeader
