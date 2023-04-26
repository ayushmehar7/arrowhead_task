const sequelize = require("../db.config")
const Sequelize = require("sequelize")
const Movie = sequelize.define("movie", {
    id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
    },
    title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.DataTypes.DOUBLE,
        defaultValue: 0
    },
    releaseDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: true
    },
    posterUrl: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Movie;