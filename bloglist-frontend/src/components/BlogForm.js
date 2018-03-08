import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit, handleChange, title, author, url }) => {
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          title: <input
            type="text"
            name="newBlogTitle"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          author: <input
            type="text"
            name="newBlogAuthor"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          url: <input
            type="text"
            name="newBlogUrl"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm