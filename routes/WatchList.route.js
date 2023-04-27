const express = require("express")
const {addMovieToWatchList, getMoviesFromUserWatchList, rateMovie, deleteMovieFromWatchList} = require("../controllers/WatchList.controller")

const router = express.Router();

router.get("/", getMoviesFromUserWatchList)

router.post("/", addMovieToWatchList)

router.patch("/", rateMovie)

router.delete("/", deleteMovieFromWatchList)

module.exports = router;