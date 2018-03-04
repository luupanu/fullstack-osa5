import React from 'react'
import Blog from '../components/Blog'

const BlogList = ({ addLike, removeBlog, blogs }) => {
  return (
    <div>
      <h2>list of blogs</h2>
      {blogs.map(blog => 
        <Blog key={blog._id} blog={blog} onLike={addLike} onRemove={removeBlog}/>
      )}
    </div>
  )
}

export default BlogList