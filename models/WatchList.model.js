const sequelize = require("../db.config")
const Sequelize = require("sequelize")
const Movie = require("../models/Movie.model")
const User = require("../models/User.model")


const WatchList = sequelize.define("watchlist", {
    username: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        references: {
            model: User,
            key: 'username'
        }
    },
    movieId: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        references: {
            model: Movie,
            key: 'id'
        }
    },
    watched: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    }
})

WatchList.hasMany(User, {
    foreignKey: 'username'
})
WatchList.hasMany(Movie, {
    foreignKey: 'id'
})

module.exports = WatchList