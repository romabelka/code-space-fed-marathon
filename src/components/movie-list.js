import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import Movie from './movie'
import Loader from './loader'

@inject('movies')
@observer
class MovieList extends Component {
    static propTypes = {

    }

    componentDidMount() {
        this.props.movies.loadAll()
    }

    render() {
        if (this.props.movies.loading) return <Loader/>
        return (
            <div>
                {this.movieItems}
            </div>
        )
    }

    get movieItems() {
        return this.props.movies.moviesList.map(movie => <Movie key = {movie.title} movie = {movie}/>)
    }
}

export default MovieList