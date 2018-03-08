export default {
  voting(id) {
    return {
      type: 'VOTE',
      id
    }
  },

  anecdoteCreation(content) {
    return {
      type: 'NEW_ANECDOTE',
      content
    }
  }
}