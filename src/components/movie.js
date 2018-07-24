import React, { Component } from 'react'
import './movie.css'

class Movie extends Component {
    static propTypes = {

    }

    render() {
        const { title, releaseDate, storyline, posterurl, likes, dislikes } = this.props.movie
        return (
            <div className="movie">
                <div className="movie--img">
                    <img src={posterurl} alt={title}/>
                </div>
                <div className="movie--info">
                    <h3>{title}</h3>
                    <h4>{releaseDate}</h4>
                    <section>
                        {storyline}
                    </section>
                    <div className="movie--likes">
                        <button className="btn btn-success">like: {likes}</button>
                        <button className="btn btn-danger">dislike: {dislikes}</button>
                    </div>
                    <button className="btn btn-primary">hide details</button>
                    <div className="movie--more">
                        <div>
                            <h5>Genres</h5>
                            <ul>
                                {this.genres}
                            </ul>
                        </div>
                        <div>
                            <h5>Actors</h5>
                            <ul>
                                {this.actors}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    get genres() {
        return this.props.movie.genres.map((genre, i) => <li key = {i}>{genre}</li>)
    }

    get actors() {
        return this.props.movie.actors.map((actor, i) => <li key = {i}>{actor}</li>)
    }
}

export default Movie