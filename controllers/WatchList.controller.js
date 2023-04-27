const Movie = require("../models/Movie.model")
const WatchList = require("../models/WatchList.model")
const { addToNotionDatabase } = require("./Notion.controller")

exports.addMovieToWatchList = async (req, res) => {
    const watchList = req.body
    WatchList.create(watchList)
        .then(() => {
            res.status(200).json({
                message: "Movie added to watchlist"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Cannot add movie to watchlist"
            })
        })
}

const getMovieDetails =  (id) => {
    const res = Movie.findByPk(id);
    return res
}

exports.getMoviesFromUserWatchList = async(req, res) => {
    try {
        const username = req.query.username
        const response = await WatchList.findAll({where: {username: username}})
        const userRating = response.map(movie => movie.rating)
        const movies =  await Promise.all(response.map(r =>  getMovieDetails(r.movieId)))
        for(let i=0;i<movies.length;i++){
            movies[i].rating = userRating[i]
        }
        res.status(200).json({
            movies: movies
        })

    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "Cannot fetch movies"
        })
    }
}

exports.rateMovie = (req, res) => {
    const rating = req.body.rating
    const username = req.query.username
    const movieId = req.query.movieId
    WatchList.upsert({
        username: username,
        movieId: movieId,
        rating: rating
    }, {
        where: {
            username: username,
            movieId: movieId
        }
    }).then(() => {
        addToNotionDatabase(username, movieId, rating)
        res.status(200).json({
            message: "Movie Rated!"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Cannot rate the movie"
        })
    })
}

exports.deleteMovieFromWatchList = (req, res) => {
    const userName = req.query.username
    const movieId = req.query.movieId;
    WatchList.destroy({
        where: {
            username: userName,
            movieId: movieId
        }
    }).then(() => {
        res.status(204).json({
            message: "Movie deleted from watchlist"
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Cannot delete movie from watchlist"
        })
        console.log(err)
    })
}
