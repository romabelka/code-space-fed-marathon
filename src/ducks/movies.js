import {all, call, put, takeEvery, take} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import moviesService from '../services/movies'

/**
 * Constants
 * */
export const moduleName = 'movies'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`
export const FETCH_ALL_FAIL = `${prefix}/FETCH_ALL_FAIL`

export const CHANGE_MOVIE = `${prefix}/CHANGE_MOVIE`
export const SET_MOVIE_LIKES_REQUEST = `${prefix}/SET_MOVIE_LIKES_REQUEST`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    loading: false,
    entities: new OrderedMap({})
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_ALL_START:
            return state.set('loading', true)

        case FETCH_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('entities', new OrderedMap(payload.movies))

        case CHANGE_MOVIE:
            return state
                .setIn(['entities', payload.movie.id], payload.movie)

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const movieListSelector = createSelector(stateSelector, state => state.entities.valueSeq().toArray())
export const loadingSelector = createSelector(stateSelector, state => state.loading)

/**
 * Action Creators
 * */

export function fetchAllMovies() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

export function setMovieLikes(movie) {
    return {
        type: SET_MOVIE_LIKES_REQUEST,
        payload: { movie }
    }
}

/**
 * Sagas
 * */

const createMoviesChanel = () => eventChannel(emit => {
    return moviesService.subscribeForMovieChanges(movie => emit({ movie }))
})

function* fetchAllSaga() {
    yield put({
        type: FETCH_ALL_START
    })

    try {
        const movies = yield call(moviesService.fetchAllMovies)

        yield put({
            type: FETCH_ALL_SUCCESS,
            payload: {movies}
        })
    } catch (error) {
        yield put({
            type: FETCH_ALL_FAIL,
            error
        })
    }
}

function* moviesSubscriptionSaga() {
    const chanel = yield call(createMoviesChanel)

    while (true) {
        const { movie } = yield take(chanel)

        yield put({
            type: CHANGE_MOVIE,
            payload: { movie }
        })
    }
}

function* setMovieLikesSaga({ payload }) {
    yield call(moviesService.setLikesCount, payload.movie.id, payload.movie.likes + 1)
}

export function* saga() {
    yield all([
        takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
        moviesSubscriptionSaga(),
        takeEvery(SET_MOVIE_LIKES_REQUEST, setMovieLikesSaga)
    ])
}