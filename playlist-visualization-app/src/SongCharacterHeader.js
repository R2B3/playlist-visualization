import React, { Component } from 'react'

const SongCharacterHeader = (props) => {
  return (
    <div style={{height: props.height}}>
      <h1 style={{color: props.colors.headerFont}}>Popularity</h1>
      {props.features.map((feature, index) => <h2 key={index} style={{color: feature.colorNeedle}}>{feature.name}</h2>)}
    </div>
  )
}

export default SongCharacterHeader
