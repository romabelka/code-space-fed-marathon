import React, { Component } from 'react'
import movies from './movies'
import MovieList from './components/movie-list'

class App extends Component {
  render() {
    return (
      <div>
        <MovieList movies = {movies} />
      </div>
    )
  }
}

export default App
