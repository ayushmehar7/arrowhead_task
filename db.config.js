const dontenv = require("dotenv")
dontenv.config()
const dbConfig = {
    HOST: process.env.SQL_HOST,
    PORT: process.env.SQL_PORT,
    USER: process.env.SQL_USER,
    PASSWORD: process.env.SQL_PASSWORD,
    DB: process.env.SQL_DB,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

  const Sequelize = require("sequelize")

  const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    }
)

module.exports = sequelize;