import React from 'react'

const BlogTitle = ({ user, logout }) => {
  return(
    <div>
      <h1>blogs</h1>
      <p>{user} logged in <button onClick={logout}>logout</button></p>
    </div>
  )  
}

export default BlogTitle