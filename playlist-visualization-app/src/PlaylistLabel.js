import React, { Component } from 'react'


class ExplicitChart extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div height={100} width={50}>
        {this.props.name}
      </div>
    )
  }
}

export default ExplicitChart;
