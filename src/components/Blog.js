import React from 'react'
import PropTypes from 'prop-types'

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

  showRemoveButton = () => {
    if (this.props.blog.user === undefined || this.props.user === this.props.blog.user.username) {
      return (<button onClick={ e => this.props.onRemove(this.props.blog._id) }>delete</button>)
    }
    return null
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
        {this.showRemoveButton()}
      </ul>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

export default Blog