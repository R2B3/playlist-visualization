import React, { Component } from 'react'


class SongCharacterHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div style={{height: this.props.height}}>
        <h1 style={{color: this.props.colors.headerFont}}>Popularity</h1>
        {this.props.features.map(feature => <h2 style={{color: feature.colorNeedle}}>{feature.name}</h2>)}
      </div>
    )
  }
}

export default SongCharacterHeader;
