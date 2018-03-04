import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailed: false
    }
  }

  toggleDetailed = () => {
    this.setState({ detailed: !this.state.detailed })
  }

  render() {
    const blog = this.props.blog
    const username = blog.user ? blog.user.name : 'anonymous'

    if (!this.state.detailed) {
      return(
        <div onClick={this.toggleDetailed} className="blog">
          <strong>{blog.author}:</strong> {blog.title}
        </div>
      )
    }

    return(
      <div className="blog">
      <ul>
        <div onClick={this.toggleDetailed}>
          <li><strong>{blog.author}:</strong> {blog.title}</li>
        </div>
        <li>{blog.url}</li>
        <li>{blog.likes} likes <button onClick={ e => this.props.onLike(blog._id) }>like</button></li>
        <li>added by {username}</li>
        <button onClick={ e => this.props.onRemove(blog._id) }>delete</button>
      </ul>
      </div>
    )
  }
}

export default Blog