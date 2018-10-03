import React, { Component } from 'react'

const YearHeader = (props) => {
  return (
    <div style={{height: props.height}}>
      <h1 style={{color: props.colors.headerFont}}>Release year</h1>
    </div>
  )
}

export default YearHeader
