import React, { Component } from 'react'


class PopularityHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div style={{height: this.props.height}}>
        <h1 style={{color: this.props.colors.headerFont}}>Popularity</h1>
      </div>
    )
  }
}

export default PopularityHeader;
