const Movie = require("../models/Movie.model")
const WatchList = require("../models/WatchList.model")
const Rating = require("../models/Rating.model")

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

exports.markMovieAsWatched = async(req, res) => {
    const username = req.query.username
    const movieId = req.query.movieId
    try{
        await WatchList.update({
            watched: true
        }, {
            where: {username: username, movieId: movieId}
        })
        res.status(200).json({
            message: "Movie marked as watched"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Unable to mark movie as watched"
        })
    }
}

const getRatingFromMovie = async (username, movieId) => {
    const rating = await Rating.findOne({where: {username: username, movieId: movieId}})
    if (rating){
        return rating.rating
    }else {
        return undefined
    }
}

exports.getMoviesFromUserWatchList = async(req, res) => {
    try {
        const username = req.query.username
        const response = await WatchList.findAll({where: {username: username}})
        const watched = response.map(movie => movie.watched)
        const movies =  await Promise.all(response.map(r =>  getMovieDetails(r.movieId)))
        const ids = movies.map(movie => movie.id)
        const ratings = await Promise.all(ids.map(id => getRatingFromMovie(username, id)))
        const titles = movies.map(movie => movie.title)
        const posterUrls = movies.map(movie => movie.posterUrl)
        const retMovies = []
        for(let i = 0; i < movies.length; i++){
            retMovies.push({id: ids[i], title: titles[i], posterUrl: posterUrls[i], watched: watched[i], rating: ratings[i]})
        }
        res.status(200).json({
            movies: retMovies
        })

    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "Cannot fetch movies"
        })
    }
}

exports.deleteMovieFromWatchList = async (req, res) => {
    const username = req.query.username
    const movieId = req.query.movieId
    console.log("GG")
    try{
        await WatchList.destroy({where: {username: username, movieId: movieId}})
        res.status(200).json({
            message: "Movie deleted from Watchlist"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Unable to delete movie from watchlist"
        })
    }
}
