import React from 'react'

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

export default BlogForm