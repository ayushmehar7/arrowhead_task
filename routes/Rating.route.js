const express = require("express")
const {rateMovie} = require("../controllers/Rating.controller")

const router = express.Router();

router.patch("/", rateMovie)

module.exports = router;