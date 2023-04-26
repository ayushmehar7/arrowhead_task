const express = require("express")
const {addMovieToWatchList, getMoviesFromUserWatchList, rateMovie} = require("../controllers/WatchList.controller")

const router = express.Router();

router.get("/", getMoviesFromUserWatchList)

router.post("/", addMovieToWatchList)

router.patch("/", rateMovie)

module.exports = router;