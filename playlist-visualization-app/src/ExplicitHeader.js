import React from 'react'

const ExplicitHeader = (props) => {

  const sortIcon = (sorted) => {
    if (!props.sorted) return "⏅"
    return props.sorted.config ? "▲" : "▼"
  }


  const sort = () => {
    const ascending = (props.sorted && props.sorted.id === props.id) ? !props.sorted.config : true
    const sortOrder = props.data.map(playlist => {return {name: playlist.name, value: playlist.data[1].value}}).sort((a,b) => ascending ? (a.value > b.value)  : (a.value < b.value))
    props.sort(sortOrder.map(x => x.name), props.id, ascending)
  }

  return (
    <div style={{height: props.height}}>
      <a onClick={sort}><h1 style={{color: props.colors.headerFont}}>Explicit {sortIcon()}</h1></a>
    </div>)
}

export default ExplicitHeader;
