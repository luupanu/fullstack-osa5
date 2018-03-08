import React from 'react'
import Blog from '../components/Blog'
import PropTypes from 'prop-types'

const BlogList = ({ addLike, removeBlog, blogs, user }) => {
  return (
    <div>
      <h2>list of blogs</h2>
      {blogs.map(blog => 
        <Blog
          key={blog._id}
          blog={blog}
          onLike={addLike}
          onRemove={removeBlog}
          user={user}
        />
      )}
    </div>
  )
}

BlogList.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired
}

export default BlogList