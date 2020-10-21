import React from 'react'

export default function ButtonSend(props) {
  return (
    <button 
      onClick={props.handleOnClick} 
      className="btn btn-primary"
    >
      Send Message
    </button>
  )
}
