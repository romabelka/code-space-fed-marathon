import firebase from 'firebase/app'
import movies from './movies'

const ref = firebase.database().ref('movies')
window.movies = movies.map(movie => ({...movie, likes: 0, dislikes: 0}))

window.setupFixtures = () => movies.forEach(movie => ref.push(movie))