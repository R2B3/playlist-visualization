import React, { Component } from 'react'


class Playlist extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div style={{height: 90}}>
        <h1 style={{color: this.props.colors.headerFont}}>{this.props ? this.props.title : ''}</h1>
      </div>
    )
  }
}

export default Playlist;
