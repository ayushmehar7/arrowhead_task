const sequelize = require("../db.config")
const Sequelize = require("sequelize")
const Movie = require("../models/Movie.model")
const User = require("../models/User.model")


const Rating = sequelize.define("rating", {
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

Rating.hasMany(User, {
    foreignKey: 'username'
})
Rating.hasMany(Movie, {
    foreignKey: 'id'
})

module.exports = Rating