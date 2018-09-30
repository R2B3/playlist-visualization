import React, { Component } from 'react'


class YearHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div style={{height: this.props.height}}>
        <h1 style={{color: this.props.colors.headerFont}}>Release year</h1>
      </div>
    )
  }
}

export default YearHeader;
