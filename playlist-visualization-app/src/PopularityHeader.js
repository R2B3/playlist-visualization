import React, { Component } from 'react'

const PopularityHeader = (props) => {
  return (
    <div style={{height: props.height}}>
      <h1 style={{color: props.colors.headerFont}}>Popularity</h1>
    </div>
  )
}

export default PopularityHeader
