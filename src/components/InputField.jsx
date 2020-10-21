import React from 'react'
import LabelComponent from './LabelComponent'

export default function InputField(props) {
  return (
    <div className="form-group">
      <LabelComponent label={props.label} />
      <input 
        name={props.name}
        className="form-control" 
        value={props.value}
        onChange={props.handleOnChange}
        placeholder={props.placeholder} 
      />
    </div>
  )
}
