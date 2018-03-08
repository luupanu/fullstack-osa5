import React from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogTitle from './components/BlogTitle'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      message: null,
      newBlogAuthor: '',
      newBlogTitle: '',
      newBlogUrl: '',
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(unsortedBlogs => {
      const blogs = unsortedBlogs.sort((a, b) => b.likes - a.likes)
      this.setState({ blogs })
    })

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()

    const blogObject = {
      author: this.state.newBlogAuthor,
      title: this.state.newBlogTitle,
      url: this.state.newBlogUrl
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          message: `a new blog '${this.state.newBlogTitle}' by ${this.state.newBlogAuthor} added`,
          newBlogAuthor: '',
          newBlogTitle: '',
          newBlogUrl: ''
        })
        setTimeout(() => {
          this.setState({ message: null })
        }, 5000)
      })
  }

  addLike = (id) => {
    const blog = this.state.blogs.find(blog => blog._id === id)
    const changedBlog = {
      user: blog.user,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }
    
    blogService
      .update(id, changedBlog)
      .then(changedBlog => {
        this.setState({
          blogs: this.state.blogs.map(blog => blog._id !== id ? blog : changedBlog)
        })
      })
      .catch(exception => {
        this.setState({
          error: `${blog.title} not found in database. perhaps it was already removed?`,
          blogs: this.state.blogs.filter(blog => blog.id !== id)
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      })
  }

  removeBlog = (id) => {
    const blog = this.state.blogs.find(blog => blog._id === id)
    const confirmed = window.confirm(`remove '${blog.title}' by ${blog.author}?`)

    if (confirmed) {
      blogService
        .remove(id)
        .then(response => {
          this.setState({
            blogs: this.state.blogs.filter(blog => blog._id !== id),
            message: `removed '${blog.title}' by ${blog.author}` 
          })
          setTimeout(() => {
            this.setState({ message: null })
          }, 5000)
        })
        .catch(exception => {
          this.setState({
            error: 'you are not the owner of this blog'
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000 )
        })
    }
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
      blogService.setToken(user.token)
    } catch (exception) {
      this.setState({
        error: 'wrong username or password'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = () => {
    this.setState({ user: null })
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  render() {
    const blogList = () => (
      <BlogList
        addLike={this.addLike}
        removeBlog={this.removeBlog}
        blogs={this.state.blogs}
        user={this.state.user.username}
      />
    )

    const blogForm = () => (
      <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
        <BlogForm
          onSubmit={this.addBlog}
          handleChange={this.handleChange}
          title={this.state.newBlogTitle}
          author={this.state.newBlogAuthor}
          url={this.state.newBlogUrl}
        />
      </Togglable>
    )

    const blogTitle = () => (
      <BlogTitle
        user={this.state.user.name}
        logout={this.logout}
      />
    )

    const loginForm = () => (
      <LoginForm
        onSubmit={this.login}
        handleChange={this.handleChange}
        username={this.state.username}
        password={this.state.password}
        message={this.state.error}
      />
    )

    return (
      <div>
        <Notification message={this.state.error} className="error"/>
        <Notification message={this.state.message} className="message"/>
        {this.state.user === null ?
          loginForm() :
          <div>
            {blogTitle()}
            {blogForm()}
            {blogList()}
          </div>}
      </div>
    )
  }
}

export default App