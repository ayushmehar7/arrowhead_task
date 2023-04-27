const Rating = require("../models/Rating.model")
const { addToNotionDatabase } = require("./Notion.controller")


exports.rateMovie = (req, res) => {
    const rating = req.body.rating
    const username = req.query.username
    const movieId = req.query.movieId
    Rating.upsert({
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