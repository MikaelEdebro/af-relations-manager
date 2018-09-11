import * as React from 'react'

const listItemStyles = {
  padding: 10,
  border: '1px solid rgba(0,0,0,.2)',
  borderRadius: 4,
  margin: '20px 0',
  cursor: 'pointer',
}

interface Props {
  text: string
  action?: any
  onClick?: any
}

const ListItem: React.SFC<Props> = props => {
  return (
    <div
      className="row align-items-center"
      style={listItemStyles}
      onClick={() => (props.onClick ? props.onClick() : null)}
    >
      <div className="col">{props.text}</div>
      {props.action && <div className="col text-right">{props.action}</div>}
    </div>
  )
}

export default ListItem
