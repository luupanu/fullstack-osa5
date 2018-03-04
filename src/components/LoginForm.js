import React from 'react'

const LoginForm = ({ onSubmit, handleChange, username, password }) => {
  return(
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={onSubmit}>
          <div>
            username: <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div>
            password: <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm