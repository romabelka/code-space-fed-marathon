import React, { Component } from 'react'
import Movie from './movie'

class MovieList extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                {this.movieItems}
            </div>
        )
    }

    get movieItems() {
        return this.props.movies.map(movie => <Movie key = {movie.title} movie = {movie}/>)
    }
}

export default MovieList