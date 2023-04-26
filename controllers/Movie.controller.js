const Movie = require("../models/Movie.model")

exports.getMovies = (req, res) => {
    Movie.findAll()
        .then(data => {
            res.status(200).json({
                total_movies: data.length,
                movies: data,
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Cannot fetch movies"
            })
        })
}

exports.addMovie = (req, res) => {
    const movie = req.body
    Movie.create(movie)
        .then(data => {
            res.status(201).json({
                message: "Movie added successfully",
                movie: data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Cannot add movie"
            })
        })
}