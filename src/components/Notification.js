import React from 'react'

const Notification = ({ message, className }) => {
  return(
    !message ? null :
    <div className={className}>{message}</div>
  )
}

export default Notification