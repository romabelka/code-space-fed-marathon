import {combineReducers} from 'redux'
import moviesReducer, {moduleName as moviesModule} from '../ducks/movies'


export default combineReducers({
    [moviesModule]: moviesReducer
})