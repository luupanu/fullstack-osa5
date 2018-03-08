import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, className }) => {
  return(
    !message ? null :
    <div className={className}>{message}</div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string.isRequired
}

export default Notification