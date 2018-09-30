import React, { Component } from 'react'


class ExplicitHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div style={{height: this.props.height}}>
        <h1 style={{color: this.props.colors.headerFont}}>Explicit</h1>
      </div>
    )
  }
}

export default ExplicitHeader;
