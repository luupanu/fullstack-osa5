import React from 'react'
import PropTypes from 'prop-types'

const BlogTitle = ({ user, logout }) => {
  return(
    <div>
      <h1>blogs</h1>
      <p>{user} logged in <button onClick={logout}>logout</button></p>
    </div>
  )  
}

BlogTitle.propTypes = {
  user: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

export default BlogTitle