const express = require("express")
const {addMovie, getMovies} = require("../controllers/Movie.controller")

const router = express.Router()

router.get("/", getMovies)

router.post("/", addMovie)

module.exports = router
