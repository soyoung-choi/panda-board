require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'panda_board',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'panda_board_test',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'panda_board_production',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00',
    logging: false,
  },
}
