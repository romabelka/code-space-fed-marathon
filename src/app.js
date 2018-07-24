import React, { Component } from 'react'
import movies from './movies'
import MovieList from './components/movie-list'

class App extends Component {
  render() {
    return (
      <div>
        <MovieList />
      </div>
    )
  }
}

export default App
