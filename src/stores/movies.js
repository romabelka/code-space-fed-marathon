import movieApiService  from '../services/movies'
import {observable, computed, action} from 'mobx'

export class MoviesStore {
    @observable movies = {}
    @observable loading = false

    @action loadAll() {
        this.loading = true

        movieApiService.fetchAllMovies()
            .then(action(movies => {
                this.movies = movies
                this.loading = false
            }))
    }

    @computed get moviesList() {
        console.log('---', this.movies)
        return Object.values(this.movies)
    }
}
