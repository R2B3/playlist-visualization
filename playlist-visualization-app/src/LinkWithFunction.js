import React, { Component } from 'react'

const LinkWithFunction = (props) => {
  const clickMe = () => {
    props.clickMe(props.id)
  }

  return (
      <a onClick={clickMe}><h2 style={{color: props.color}}>{props.text}</h2></a>
  )
}

export default LinkWithFunction
