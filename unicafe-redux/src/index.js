import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const s = store.getState()
  const palautteita = s.good + s.ok + s.bad

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{s.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{s.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{s.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{((s.good - s.bad) / palautteita).toFixed(2)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{(s.good / palautteita * 100).toFixed(2)} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div>
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)