import React from 'react'

export default function Col(props) {
  return (
    <div className={`col-md-${props.size}`}>
      {props.children}
    </div>
  )
}
