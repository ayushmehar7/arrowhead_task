const express = require("express")
const {addMovieToWatchList, getMoviesFromUserWatchList, markMovieAsWatched, deleteMovieFromWatchList} = require("../controllers/WatchList.controller")

const router = express.Router();

router.get("/", getMoviesFromUserWatchList)

router.patch("/", markMovieAsWatched)

router.post("/", addMovieToWatchList)

router.delete("/", deleteMovieFromWatchList)

module.exports = router;