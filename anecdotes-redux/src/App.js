import React from 'react';
import actionFor from './actionCreators'

class App extends React.Component {
  createAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch(
      actionFor.anecdoteCreation(event.target.content.value)
    )
    event.target.content.value = ''
  }

  vote = (id) => () => {
    this.props.store.dispatch(
      actionFor.voting(id)
    )
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.createAnecdote}>
          <div><input name="content"/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App