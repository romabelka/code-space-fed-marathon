import firebase from 'firebase/app'

class MovieApiService {
    fetchAllMovies() {
        return firebase.database()
            .ref('movies')
            .once('value')
            .then(snapshot =>
                Object.entries(snapshot.val())
                    .reduce((acc, [id, movie]) => ({
                        ...acc,
                        [id]: { id, ...movie }
                    }), {})
            )
    }

    setLikesCount(id, likes) {
        return firebase.database()
            .ref(`movies/${id}/likes`)
            .set(likes)
    }

    subscribeForMovieChanges(callback) {
        const dataCallback = (snapshot => callback({
            id: snapshot.key,
            ...snapshot.val()
        }))

        const ref = firebase.database().ref('movies')

        ref.on('child_changed', dataCallback)

        return () => ref.off('child_changed', dataCallback)
    }
}

export default new MovieApiService()