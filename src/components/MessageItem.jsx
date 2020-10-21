import React from 'react'
import Alert from './Alert'
import Col from './Col'

export default function MessageItem(props) {
  const alertKind = props.name === "Hassan" ? "warning": "info"
  return (
    <Col size="12">
      <Alert kind={alertKind}>
        <>
          <strong>{props.message}</strong>
          <span>- {props.name}</span>
        </> 
      </Alert>
    </Col>
  )
}
