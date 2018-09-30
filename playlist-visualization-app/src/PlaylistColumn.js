import React, { Component } from 'react'
import Playlist from './Playlist'
import EmptyHeader from './EmptyHeader'

class PlaylistColumn extends Component {

  constructor(props) {
    super(props)

  }

  render() {

    return (
      <div>
        <EmptyHeader height={this.props.headerHeight} />
        {this.props.data.map((x, index) => <Playlist key={index} title={x.name} colors={this.props.colors} chartBoxStyle={this.props.chartBoxStyle} />)}
      </div>
    )
  }
}

export default PlaylistColumn;
