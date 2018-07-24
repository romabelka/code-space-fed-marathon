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
}

export default new MovieApiService()