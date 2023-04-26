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
    rating: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: true,
        validate: {
            min: 1,
            max: 5
        }
    }
})

WatchList.hasMany(User, {
    foreignKey: 'username'
})
WatchList.hasMany(Movie, {
    foreignKey: 'id'
})

module.exports = WatchList