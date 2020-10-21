import React from 'react'
import LabelComponent from './LabelComponent'

export default function InputField(props) {
  return (
    <div className="form-group">
      <LabelComponent label={props.label} />
      <input 
        ref={props.myRef} 
        className="form-control" 
        placeholder={props.placeholder} 
      />
    </div>
  )
}
