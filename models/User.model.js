const sequelize = require("../db.config")
const Sequelize = require("sequelize")
const User = sequelize.define("user", {
    username: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User