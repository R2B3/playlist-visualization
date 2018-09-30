import React, { Component } from 'react'


class EmptyHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div style={{height: this.props.height}}>
      </div>
    )
  }
}

export default EmptyHeader;
