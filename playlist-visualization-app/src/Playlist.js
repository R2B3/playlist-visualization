import React, { Component } from 'react'


class Playlist extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div style={this.props.chartBoxStyle}>
        <h1 style={{color: this.props.colors.headerFont}}>{this.props ? this.props.title : ''}</h1>
      </div>
    )
  }
}

export default Playlist;
