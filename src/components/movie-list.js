import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAllMovies, movieListSelector, loadingSelector} from '../ducks/movies'
import Movie from './movie'
import Loader from './loader'

@connect(state => ({
    movies: movieListSelector(state),
    loading: loadingSelector(state)
}), { loadAll: fetchAllMovies })
class MovieList extends Component {
    static propTypes = {

    }

    componentDidMount() {
        this.props.loadAll()
    }

    render() {
        if (this.props.loading) return <Loader/>
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