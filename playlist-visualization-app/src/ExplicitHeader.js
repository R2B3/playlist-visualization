import React from 'react'

const ExplicitHeader = (props) => {

  const sortIcon = (sorted) => {
    if (!props.sorted || props.sorted.id !== props.id) return ""
    return props.sorted.config ? "less to more" : "more to less"
  }


  const sort = () => {
    const ascending = (props.sorted && props.sorted.id === props.id) ? !props.sorted.config : false
    const sortOrder = props.data.map(playlist => {return {name: playlist.name, value: playlist.data[1].value}}).sort((a,b) => ascending ? (a.value > b.value)  : (a.value < b.value))
    props.sort(sortOrder.map(x => x.name), props.id, ascending)
  }

  return (
    <div style={props.chartBoxStyle}>
      <a onClick={sort}><h1 style={{color: props.colors.headerFont}}>Explicit</h1>
      <h2 style={{color: props.colors.headerFont}}>{sortIcon()}</h2></a>
    </div>)
}

export default ExplicitHeader;
