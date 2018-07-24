import {MoviesStore} from './movies'

const stores = {
    movies: new MoviesStore()
}

//dev only
window.stores = stores

export default stores