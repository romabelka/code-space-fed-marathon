import movieApiService  from '../services/movies'
import {observable, computed, action} from 'mobx'

export class MoviesStore {
    @observable movies = {}
    @observable loading = false

    constructor() {
        movieApiService.subscribeForMovieChanges(movie =>
            this.movies[movie.id].update(movie)
        )
    }

    @action loadAll() {
        this.loading = true

        movieApiService.fetchAllMovies()
            .then(action(movies => {
                Object.values(movies)
                    .forEach(movie => this.movies[movie.id] = new Movie(movie))
                this.loading = false
            }))
    }

    @computed get moviesList() {
        return Object.values(this.movies)
    }
}

class Movie {
    @observable genres
    @observable posterurl
    @observable releaseDate
    @observable title
    @observable storyline
    @observable actors
    @observable likes
    @observable dislikes
    @observable id

    constructor(movie) {
        Object.assign(this, movie)
    }

    @action like() {
        movieApiService.setLikesCount(this.id, this.likes + 1)
    }

    @action update(data) {
        Object.assign(this, data)
    }
}
