const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const sequelize = require("./db.config")

dotenv.config()

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });


const movies = require("./routes/Movie.route")
const users = require("./routes/User.route")
const watchList = require("./routes/WatchList.route")

app.use("/api/v1/movies", movies)
app.use("/api/v1/users", users)
app.use("/api/v1/watchlist", watchList)

app.get("/", (req, res) => {
  res.json({ message: "Welcome to demo application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
