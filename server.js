const express = require("express");
const cors = require("cors");

const sequelize = require("./db.config")

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

sequelize.sync({force: true}).then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });


const movies = require("./routes/Movie.route")
const users = require("./routes/User.route")

app.use("/api/v1/movies", movies)
app.use("/api/v1/users", users)

app.get("/", (req, res) => {
  res.json({ message: "Welcome to demo application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
